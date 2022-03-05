<template>
  <div id='custom-v-model'>
    <h3>自定义 v-model 测试</h3>
    <CustomModel v-model="value" ></CustomModel>
    value: {{ value }}
  </div>
</template>
<script>
import CustomModel from '@/components/custom-v-model/index'

export default {
  name: 'CustomVModel',
  components: {
    CustomModel
  },
  data () {
    return {
      value: "13"
    }
  }
}
</script>
