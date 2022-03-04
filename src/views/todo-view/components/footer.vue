<template>
  <div id="footer">
    <span>我叫做：{{this.author}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      author: "天幽",
    };
  },
};
</script>
<style lang="scss" scoped>
#footer{
  margin-top: 40px;
  text-align: center;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
.main-header{
  text-align: center;
  h1{
    font-size: 100px;
    color: rgba(175, 47, 47, 0.4);
    font-weight: 100;
    margin: 20px;
  }
}
</style>
