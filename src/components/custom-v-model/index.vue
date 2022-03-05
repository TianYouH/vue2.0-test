<template>
  <input
    type="text"
    :value="customModel"
    @input="$emit('customEvent', $event.target.value)"
  />
</template>
<script>
export default {
  name: 'CustomModel',
  model: {
    prop: 'customModel',
    event: 'customEvent'
  },
  props: {
    customModel: {
      type:  String,
      default() {
        return ""
      }
    }
  }
};
</script>
