<template>
  <div id="vue-route">
    <h1>vue-router测试</h1>
    <el-button type="primary" size="default" @click="onClick"
      >修改哈希</el-button
    >
  </div>
</template>
<script>
/**
 * hash 变化，包括：
 * 1. JS 修改 url
 * 2. 手动修改 url 的 hash
 * 3. 浏览器前进、后退
 */
window.onhashchange = (event) => {
  console.log("old url：", event.oldURL);
  console.log("new url：", event.newURL);

  console.log("hash：", event.hash);
};

// 页面首次加载，获取 hash
document.addEventListener("DOMContentLoaded", () => {
  console.log("hash:", location.hash);
});

export default {
  name: "VueEoute",
  data() {
    return {};
  },
  methods: {
    // JS 修改 url
    onClick() {
      location.href = '#/vue/custom-v-model'
    },
  },
};
</script>
<style lang="scss" scoped></style>
