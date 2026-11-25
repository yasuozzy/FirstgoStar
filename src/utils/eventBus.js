import baseEventBus from "./eventBus.ts";

const eventBus = baseEventBus;

if (!eventBus.$on) {
  eventBus.$on = eventBus.on.bind(eventBus);
}

if (!eventBus.$off) {
  eventBus.$off = eventBus.off.bind(eventBus);
}

if (!eventBus.$emit) {
  eventBus.$emit = eventBus.emit.bind(eventBus);
}

export { eventBus };
export default eventBus;
