<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
// import { initCallService } from '@/uni_modules/tuikit-atomic-x/server/callService';


// initCallService();
// onLaunch(() => {
//   console.log("App Launch");
// });

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>
