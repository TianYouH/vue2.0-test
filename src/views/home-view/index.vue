<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Vue</template>
          <el-menu-item index="/vue/lifecycle" >Lifecycle</el-menu-item>
          <el-menu-item index="/vue/custom-v-model" >Custom v-model</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">Web Api</template>
          <el-menu-item index="/webapi/drop" >HTML 拖放 API</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">三方插件</template>
          <el-menu-item index="/plug-in/clodop" >CLodop</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">实战目录</template>
          <el-menu-item index="/todo"  >Todo</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      activeIndex: "/",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
