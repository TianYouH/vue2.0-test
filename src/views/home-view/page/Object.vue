<template>
  <div id='obj'>
    Objct 测试页
    <h2>Object.defineProperty()</h2>
    看源码 及控制台打印 
  </div>
</template>
<script>
// Object.defineProperty() 测试代码开始***************************************************
/**
 * 模拟 触发更新视图
 */
function updateView() {
  console.log("视图更新");
}

// 重新定义数组原型 [场景三]
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
["push", "pop", "shift", "unshift", "splice"].forEach(methodName => {
  arrProto[methodName] = function () {
    updateView(); // 触发试图更新
    oldArrayProperty[methodName].call(this, ...arguments)
  }
})

/**
 * 重新定义属性，监听起来
 * @param {*} target 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive(target, key, value) {
  // 增加深度监听 递归 [场景一]
  observer(value)
  // 核心 API
  Object.defineProperty(target, key, {
    get(){
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 增加深度监听 递归 [场景二]
        observer(newValue)

        // 设置新值
        // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
        value = newValue

        updateView()
      }
    }
  })
}

/**
 * 监听对象属性
 * @param {*} target 
 */
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组
    return target
  }

  // 拦截数组 将其隐式原型指向 自定义数组原型类 [场景三]
  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  // 重新定义各个属性（for in 也可以遍历数组）
  for (const key in target) {
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  name: 'tianyou',
  age: 20,
  info: {
    address: '河南'
  },
  nums: [10,20,30]
}

// 监听数据
observer(data)

// 测试
// data.name = "huang" // 视图更新
// data.age = 66 // 视图更新
// data.info.address = "上海" // [场景一]：深度监听
// data.age = { num: 99 } // [场景二]：赋值对象
// data.nums.push(4) // [场景三]：监听数组变化

// 特殊场景
data.x = 666 // 新增属性，监听不到--所有有 Vue.set
delete data.x // 删除属性，监听不到--所有有 Vue.delete

console.log(data);

// Object.defineProperty() 测试代码结束***************************************************

export default {
  name: 'obj',
  data () {
    return {}
  }
}
</script>
<style lang='scss' scoped>

</style>