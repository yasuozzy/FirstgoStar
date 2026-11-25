const fs = require("fs");
const path = require("path");
const { parse: parseSfc } = require("@vue/compiler-sfc");
const { parse: parseTemplate } = require("@vue/compiler-dom");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const childProcess = require("child_process");

const root = process.cwd();
const rawArgs = process.argv.slice(2);
const fromHead = rawArgs.includes("--from-head");
const cliFiles = rawArgs.filter(arg => arg !== "--from-head");
const targetRoot = path.join(root, "src", "pages", "service", "work");

const vueHookMap = {
  created: "onMounted",
  mounted: "onMounted",
  beforeDestroy: "onBeforeUnmount",
  destroyed: "onBeforeUnmount",
  activated: "onActivated",
  deactivated: "onDeactivated",
};

const uniHookMap = {
  onLoad: "onLoad",
  onShow: "onShow",
  onReady: "onReady",
  onReachBottom: "onReachBottom",
  onPullDownRefresh: "onPullDownRefresh",
};

function walk(dir) {
  const result = [];
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      result.push(...walk(file));
    } else if (/\.vue$/i.test(name)) {
      result.push(file);
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function readFilePreserveBom(file) {
  const bytes = fs.readFileSync(file);
  const hasBom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  if (fromHead) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const headBytes = childProcess.execFileSync("git", ["show", `HEAD:${rel}`], { cwd: root });
    return {
      hasBom,
      text: headBytes.toString("utf8").replace(/^\uFEFF/, ""),
    };
  }
  return {
    hasBom,
    text: bytes.toString("utf8").replace(/^\uFEFF/, ""),
  };
}

function writeFilePreserveBom(file, text, hasBom) {
  fs.writeFileSync(file, (hasBom ? "\uFEFF" : "") + text, "utf8");
}

function sourceOf(script, node) {
  return script.content.slice(node.start, node.end);
}

function keyName(node) {
  if (!node) return "";
  if (node.type === "Identifier") return node.name;
  if (node.type === "StringLiteral" || node.type === "NumericLiteral") return String(node.value);
  return "";
}

function functionParts(script, prop) {
  if (prop.type === "ObjectMethod") {
    return {
      async: prop.async,
      params: prop.params,
      body: prop.body,
    };
  }
  const value = prop.value;
  if (value && (value.type === "FunctionExpression" || value.type === "ArrowFunctionExpression")) {
    return {
      async: value.async,
      params: value.params,
      body: value.body,
    };
  }
  return null;
}

function returnObjectFromData(dataProp) {
  const parts = functionParts(null, dataProp);
  if (!parts || !parts.body || parts.body.type !== "BlockStatement") return null;
  for (const stmt of parts.body.body) {
    if (stmt.type === "ReturnStatement" && stmt.argument && stmt.argument.type === "ObjectExpression") {
      return stmt.argument;
    }
  }
  return null;
}

function collectProps(prop) {
  if (!prop || !prop.value) return { names: [], code: "" };
  const value = prop.value;
  const names = [];
  if (value.type === "ArrayExpression") {
    for (const el of value.elements) {
      if (el && el.type === "StringLiteral") names.push(el.value);
    }
  } else if (value.type === "ObjectExpression") {
    for (const item of value.properties) {
      if (item.key) names.push(keyName(item.key));
    }
  }
  return { names, node: value };
}

function collectKnown(script, optionProps) {
  const data = new Set();
  const methods = new Set();
  const computed = new Set();
  const props = new Set();

  const dataProp = optionProps.filter(p => keyName(p.key) === "data").at(-1);
  const dataObject = dataProp ? returnObjectFromData(dataProp) : null;
  if (dataObject) {
    for (const item of dataObject.properties) {
      if (item.key && item.type !== "SpreadElement") data.add(keyName(item.key));
    }
  }

  for (const prop of optionProps) {
    const name = keyName(prop.key);
    if (name === "methods" && prop.value && prop.value.type === "ObjectExpression") {
      for (const item of prop.value.properties) {
        if (item.key) methods.add(keyName(item.key));
      }
    }
    if (name === "computed" && prop.value && prop.value.type === "ObjectExpression") {
      for (const item of prop.value.properties) {
        if (item.key) computed.add(keyName(item.key));
      }
    }
    if (name === "props") {
      const propInfo = collectProps(prop);
      for (const item of propInfo.names) props.add(item);
    }
  }

  return { data, methods, computed, props, dataObject };
}

function collectThisUsage(ast, known) {
  const unknownRefs = new Set();
  const unknownCalls = new Set();
  let usesEmit = false;
  let usesProxy = false;
  let usesNextTick = false;
  let usesForceUpdate = false;

  traverse(ast, {
    ThisExpression(path) {
      if (path.parentPath && path.parentPath.isMemberExpression() && path.parentPath.node.object === path.node) return;
      usesProxy = true;
    },
    MemberExpression(path) {
      if (!path.node.object || path.node.object.type !== "ThisExpression") return;
      const prop = keyName(path.node.property);
      if (!prop) return;
      if (prop === "$emit") usesEmit = true;
      if (prop === "$refs" || prop === "$u" || prop === "$store") usesProxy = true;
      if (prop === "$nextTick") usesNextTick = true;
      if (prop === "$forceUpdate") {
        usesForceUpdate = true;
        usesProxy = true;
      }
      if (prop.startsWith("$")) return;
      if (known.data.has(prop) || known.methods.has(prop) || known.computed.has(prop) || known.props.has(prop)) return;
      if (path.parentPath && path.parentPath.isCallExpression() && path.parentPath.node.callee === path.node) {
        unknownCalls.add(prop);
        usesProxy = true;
      } else {
        unknownRefs.add(prop);
      }
    },
  });

  return { unknownRefs, unknownCalls, usesEmit, usesProxy, usesNextTick, usesForceUpdate };
}

function transformThis(rootNode, known, usage) {
  traverse(rootNode, {
    noScope: true,
    CallExpression(path) {
      const callee = path.node.callee;
      if (callee.type !== "MemberExpression" || callee.object.type !== "ThisExpression") return;
      const prop = keyName(callee.property);
      if (prop === "$emit") {
        path.node.callee = t.identifier("emit");
        return;
      }
      if (prop === "$set") {
        const [target, key, value] = path.node.arguments;
        if (target && key && value) {
          path.replaceWith(t.assignmentExpression("=", t.memberExpression(target, key, true), value));
        }
        return;
      }
      if (prop === "$nextTick") {
        path.node.callee = t.identifier("nextTick");
        return;
      }
      if (prop === "$forceUpdate") {
        path.node.callee = t.identifier("forceUpdate");
        return;
      }
      if (usage.unknownCalls.has(prop)) {
        path.node.callee = t.memberExpression(t.identifier("proxy"), t.identifier(prop));
      }
    },
    MemberExpression(path) {
      if (!path.node.object || path.node.object.type !== "ThisExpression") return;
      const prop = keyName(path.node.property);
      if (!prop) return;
      if (known.data.has(prop) || usage.unknownRefs.has(prop)) {
        path.replaceWith(t.memberExpression(t.identifier(prop), t.identifier("value")));
        return;
      }
      if (known.props.has(prop)) {
        path.replaceWith(t.memberExpression(t.identifier("props"), t.identifier(prop)));
        return;
      }
      if (known.methods.has(prop) || known.computed.has(prop)) {
        path.replaceWith(t.identifier(prop));
        return;
      }
      if (prop === "$refs") {
        path.replaceWith(t.memberExpression(t.identifier("proxy"), t.identifier("$refs")));
        return;
      }
      if (prop === "$u") {
        path.replaceWith(t.memberExpression(t.identifier("proxy"), t.identifier("$u")));
        return;
      }
      if (prop === "$store") {
        path.replaceWith(t.memberExpression(t.identifier("proxy"), t.identifier("$store")));
      }
    },
    ThisExpression(path) {
      if (path.parentPath && path.parentPath.isMemberExpression() && path.parentPath.node.object === path.node) return;
      path.replaceWith(t.identifier("proxy"));
    },
  });
}

function cloneAndTransform(node, known, usage) {
  const cloned = t.cloneNode(node, true);
  const wrapper = t.file(t.program([t.expressionStatement(cloned)]));
  transformThis(wrapper, known, usage);
  return cloned;
}

function generateParams(params) {
  return params.map(param => generate(param, { comments: true }).code).join(", ");
}

function generateBody(bodyNode, known, usage) {
  const body = t.cloneNode(bodyNode, true);
  const fn = t.functionExpression(null, [], body.type === "BlockStatement" ? body : t.blockStatement([t.returnStatement(body)]));
  const program = t.file(t.program([t.expressionStatement(fn)]));
  transformThis(program, known, usage);
  const generated = generate(program.program.body[0].expression.body, { comments: true }).code;
  return generated.replace(/^\{\n?/, "").replace(/\n?\}$/, "").trim();
}

function generateFunctionConst(name, parts, known, usage) {
  const prefix = parts.async ? "async " : "";
  const params = generateParams(parts.params);
  const body = generateBody(parts.body, known, usage);
  return `const ${name} = ${prefix}(${params}) => {\n${indent(body)}\n};`;
}

function indent(code, spaces = 2) {
  if (!code) return "";
  const pad = " ".repeat(spaces);
  return code.split(/\r?\n/).map(line => (line ? pad + line : line)).join("\n");
}

function groupedEntries(items, getName) {
  const counts = new Map();
  for (const item of items) {
    const name = getName(item);
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  const seen = new Map();
  return items.map(item => {
    const name = getName(item);
    const index = seen.get(name) || 0;
    seen.set(name, index + 1);
    const total = counts.get(name) || 1;
    return {
      item,
      originalName: name,
      outputName: total > 1 && index < total - 1 ? `${name}Legacy${index + 1}` : name,
    };
  });
}

function transformTemplate(template) {
  if (!template.includes("slot=") && !template.includes("u--image")) return template;
  let output = template.replace(/<\/?u--image\b/g, m => m.replace("u--image", "u-image"));
  const ast = parseTemplate(output, { comments: true });
  const replacements = [];

  function visit(node) {
    if (node.type === 1) {
      const slotProp = node.props.find(p => p.type === 6 && p.name === "slot" && p.value);
      if (slotProp) {
        replacements.push({ start: node.loc.start.offset, end: node.loc.start.offset, text: `<template #${slotProp.value.content}>\n` });
        replacements.push({ start: node.loc.end.offset, end: node.loc.end.offset, text: `\n</template>` });
        replacements.push({ start: slotProp.loc.start.offset, end: slotProp.loc.end.offset, text: "" });
      }
      for (const child of node.children || []) visit(child);
    } else if (node.children) {
      for (const child of node.children) visit(child);
    }
  }

  for (const child of ast.children) visit(child);
  replacements.sort((a, b) => b.start - a.start);
  for (const item of replacements) {
    output = output.slice(0, item.start) + item.text + output.slice(item.end);
  }
  return output;
}

function mergeImportNames(existing, add) {
  const set = new Set(existing);
  for (const item of add) set.add(item);
  return Array.from(set).sort();
}

function migrateScript(script) {
  const ast = parser.parse(script.content, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const importNodes = [];
  let exportObject = null;

  for (const stmt of ast.program.body) {
    if (stmt.type === "ImportDeclaration") {
      importNodes.push(stmt);
    } else if (stmt.type === "ExportDefaultDeclaration" && stmt.declaration.type === "ObjectExpression") {
      exportObject = stmt.declaration;
    }
  }

  if (!exportObject) return null;

  const optionProps = exportObject.properties.filter(prop => prop.type === "ObjectProperty" || prop.type === "ObjectMethod");
  const known = collectKnown(script, optionProps);
  const usage = collectThisUsage(ast, known);
  const vueImports = new Set();
  const uniImports = new Set();
  const output = [];
  const defineOptions = {};

  for (const prop of optionProps) {
    const name = keyName(prop.key);
    if (name === "created" || name === "mounted" || name === "beforeDestroy" || name === "destroyed" || name === "activated" || name === "deactivated") {
      vueImports.add(vueHookMap[name]);
    }
    if (uniHookMap[name]) uniImports.add(uniHookMap[name]);
  }
  if (known.data.size || usage.unknownRefs.size) vueImports.add("ref");
  if (known.computed.size) vueImports.add("computed");
  if (usage.usesProxy || usage.unknownCalls.size) vueImports.add("getCurrentInstance");
  if (usage.usesNextTick) vueImports.add("nextTick");

  const normalImports = [];
  const existingVue = [];
  const existingUni = [];
  for (const node of importNodes) {
    const source = node.source.value;
    if (source === "vue") {
      for (const spec of node.specifiers) {
        if (spec.type === "ImportSpecifier") existingVue.push(spec.imported.name);
      }
    } else if (source === "@dcloudio/uni-app") {
      for (const spec of node.specifiers) {
        if (spec.type === "ImportSpecifier") existingUni.push(spec.imported.name);
      }
    } else {
      normalImports.push(generate(node, { comments: true }).code);
    }
  }

  const vueNames = mergeImportNames(existingVue, vueImports);
  const uniNames = mergeImportNames(existingUni, uniImports);
  if (vueNames.length) normalImports.push(`import { ${vueNames.join(", ")} } from "vue";`);
  if (uniNames.length) normalImports.push(`import { ${uniNames.join(", ")} } from "@dcloudio/uni-app";`);

  output.push(...normalImports);

  const nameProp = optionProps.find(prop => keyName(prop.key) === "name");
  if (nameProp && nameProp.value) defineOptions.name = generate(nameProp.value, { comments: true }).code;
  if (Object.keys(defineOptions).length) {
    const entries = Object.entries(defineOptions).map(([k, v]) => `${k}: ${v}`).join(", ");
    output.push(`\ndefineOptions({ ${entries} });`);
  }

  const propsProp = optionProps.find(prop => keyName(prop.key) === "props");
  if (propsProp && propsProp.value) {
    output.push(`\nconst props = defineProps(${sourceOf(script, propsProp.value)});`);
  }
  if (usage.usesEmit) output.push("\nconst emit = defineEmits<any>();");
  if (usage.usesProxy || usage.unknownCalls.size || usage.usesForceUpdate) {
    output.push("\nconst proxy = getCurrentInstance()?.proxy as any;");
  }
  if (usage.usesForceUpdate) {
    output.push("const forceUpdate = () => proxy?.$forceUpdate?.();");
  }

  if (known.dataObject) {
    const dataItems = known.dataObject.properties.filter(item => item.key && item.type !== "SpreadElement");
    for (const entry of groupedEntries(dataItems, item => keyName(item.key))) {
      const item = entry.item;
      const valueNode = item.type === "ObjectProperty" ? item.value : t.functionExpression(null, item.params, item.body);
      const value = sourceOf(script, valueNode);
      output.push(`const ${entry.outputName} = ref(${value});`);
    }
  }
  for (const name of usage.unknownRefs) {
    if (/^[A-Za-z_$][\w$]*$/.test(name) && !known.data.has(name)) {
      output.push(`const ${name} = ref<any>();`);
    }
  }

  for (const prop of optionProps) {
    const name = keyName(prop.key);
    if (name !== "computed" || !prop.value || prop.value.type !== "ObjectExpression") continue;
    const computedItems = prop.value.properties.filter(item => item.key);
    for (const entry of groupedEntries(computedItems, item => keyName(item.key))) {
      const item = entry.item;
      const computedName = entry.outputName;
      const parts = functionParts(script, item);
      if (parts) {
        const body = generateBody(parts.body, known, usage);
        output.push(`const ${computedName} = computed(() => {\n${indent(body)}\n});`);
      } else if (item.type === "ObjectProperty") {
        output.push(`const ${computedName} = computed(${sourceOf(script, item.value)});`);
      }
    }
  }

  for (const prop of optionProps) {
    const name = keyName(prop.key);
    if (name !== "methods" || !prop.value || prop.value.type !== "ObjectExpression") continue;
    const methodItems = prop.value.properties.filter(item => item.key);
    for (const entry of groupedEntries(methodItems, item => keyName(item.key))) {
      const item = entry.item;
      const methodName = entry.outputName;
      const parts = functionParts(script, item);
      if (parts) output.push(generateFunctionConst(methodName, parts, known, usage));
    }
  }

  for (const prop of optionProps) {
    const name = keyName(prop.key);
    const hook = vueHookMap[name] || uniHookMap[name];
    if (!hook) continue;
    const parts = functionParts(script, prop);
    if (!parts) continue;
    const params = generateParams(parts.params);
    const body = generateBody(parts.body, known, usage);
    output.push(`${hook}((${params}) => {\n${indent(body)}\n});`);
  }

  return output.filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function migrateFile(file) {
  const { text, hasBom } = readFilePreserveBom(file);
  const parsed = parseSfc(text, { filename: file });
  const descriptor = parsed.descriptor;
  if (!descriptor.script || descriptor.scriptSetup) return { changed: false, skipped: "no-classic-script" };

  const script = descriptor.script;
  const migrated = migrateScript(script);
  if (!migrated) return { changed: false, skipped: "no-export-default" };

  let next = text;
  const templateBlock = descriptor.template;
  if (templateBlock) {
    const transformedTemplate = transformTemplate(templateBlock.content);
    if (transformedTemplate !== templateBlock.content) {
      next = next.slice(0, templateBlock.loc.start.offset) + transformedTemplate + next.slice(templateBlock.loc.end.offset);
    }
  }

  const fresh = parseSfc(next, { filename: file }).descriptor.script;
  const scriptStart = fresh.loc.start.offset;
  const scriptEnd = fresh.loc.end.offset;
  const openStart = next.lastIndexOf("<script", scriptStart);
  const openEnd = next.indexOf(">", openStart) + 1;
  const closeStart = next.indexOf("</script>", scriptEnd);
  next = next.slice(0, openStart) + `<script setup lang="ts">\n` + migrated + next.slice(scriptEnd, closeStart) + next.slice(closeStart);

  if (next !== text) {
    writeFilePreserveBom(file, next, hasBom);
    return { changed: true };
  }
  return { changed: false };
}

const argFiles = cliFiles.map(item => path.resolve(root, item));
const files = argFiles.length ? argFiles : walk(targetRoot);
const result = [];

for (const file of files) {
  const rel = path.relative(root, file);
  try {
    const status = migrateFile(file);
    result.push({ file: rel, ...status });
  } catch (error) {
    result.push({ file: rel, error: error.message });
    process.exitCode = 1;
  }
}

for (const item of result) {
  console.log(JSON.stringify(item));
}
