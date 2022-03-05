<template>
  <div id='child-component2'>
    子组件2 , 父组件传值{{ text }}
     <el-input v-model="value"></el-input>
  </div>
</template>
<script>
export default {
  name: 'ChildComponent2',
  props: ["text"],
  data() {
    return {
      value: '2'
    }
  },
  beforeCreate() {
    console.log("子2 beforeCreate");
  },
  created() {
    console.log("子2 created");
  },
  beforeMount() {
    console.log("子2 beforeMount");
  },
  mounted() {
    console.log("子2 mounted");
  },
  beforeUpdate() {
    console.log("子2 beforeUpdate");
  },
  updated() {
    console.log("子2 updated");
  },
  activated() {
    console.log("子2 activated");
  },
  deactivated() {
    console.log("子2 deactivated");
  },
  beforeDestroy() {
    console.log("子2 beforeDestroy");
  },
  destroyed() {
    console.log("子2 destroyed");
  },
}
</script>
<style lang='scss' scoped>
#child-component2 {
  border: 1px solid #000;
}
</style>