<template>
  <div id="lifecycle">
    <h3>父组件</h3>
    <el-button type="primary" size="default" @click="onClick">切换子组件,测试 activated</el-button>
    
    <p>更新钩子测试</p>
    <el-input v-model="text"></el-input>
    <p>text:{{ text }}</p>
    <h3>子组件区域</h3>
    <keep-alive >
      <component :is="componentId" :text="text" ></component>
    </keep-alive>
  </div>
</template>
<script>
import ChildComponent from "./ChildComponent.vue";
import ChildComponent2 from "./ChildComponent2.vue";

export default {
  name: "Lifecycle",
  components: {
    ChildComponent,
    ChildComponent2
  },
  data() {
    return {
      text: 1,
      componentId: 'ChildComponent'
    };
  },
  beforeCreate() {
    console.log("父 beforeCreate");
  },
  created() {
    console.log("父 created");
  },
  beforeMount() {
    console.log("父 beforeMount");
  },
  mounted() {
    console.log("父 mounted");
  },
  beforeUpdate() {
    console.log("父 beforeUpdate");
  },
  updated() {
    console.log("父 updated");
  },
  beforeDestroy() {
    console.log("父 beforeDestroy");
  },
  destroyed() {
    console.log("父 destroyed");
  },
  methods: {
    onClick () {
      if (this.componentId === 'ChildComponent') {
        this.componentId = 'ChildComponent2'
      }else {
        this.componentId = 'ChildComponent'
      }
    }
  }
};
</script>
