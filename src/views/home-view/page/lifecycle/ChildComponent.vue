<template>
  <div id='child-component'>
    子组件 , 父组件传值{{ text }}
     <el-input v-model="value"></el-input>
  </div>
</template>
<script>
export default {
  name: 'ChildComponent',
  props: ["text"],
  data() {
    return {
      value: '2'
    }
  },
  beforeCreate() {
    console.log("子 beforeCreate");
  },
  created() {
    console.log("子 created");
  },
  beforeMount() {
    console.log("子 beforeMount");
  },
  mounted() {
    console.log("子 mounted");
  },
  beforeUpdate() {
    console.log("子 beforeUpdate");
  },
  updated() {
    console.log("子 updated");
  },
  activated() {
    console.log("子 activated");
  },
  deactivated() {
    console.log("子 deactivated");
  },
  beforeDestroy() {
    console.log("子 beforeDestroy");
  },
  destroyed() {
    console.log("子 destroyed");
  },
}
</script>
<style lang='scss' scoped>
#child-component {
  border: 1px solid #000;
}
</style>