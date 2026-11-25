<template>
  <view style="height: 100vh;">
    <!-- <TUIChat :conversationID="conversationID" /> -->
  </view>
</template>
<script>
// import TUIChat from '@/TUIKit/components/TUIChat/index.vue'; 
export default {
  // components: {
  //   TUIChat
  // },
  data() {
    return {
      conversationID: ''
    };
  },
  onLoad(options) {
    if (options.conversationID) {
      this.conversationID = options.conversationID;
    }
  }
};
</script>
