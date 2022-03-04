<template>
  <div id="todo-view">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Todo from "./components/todo";

export default {
  name: "TodoView",
    components: {
    Header,
    Footer,
    Todo,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
#todo-view{
  background-image: url('../../assets/images/bg.jpeg');
  background-size: cover;
  background-position: center;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #4d4d4d;
  font-weight: 300;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}
#cover{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: .9;
  z-index: -1;
}
</style>
