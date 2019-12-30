<template>
  <div>
      <!-- 插槽 默认插槽-->
      <!-- <slot></slot> -->
      <!-- 后备内容 -->
      <!-- <slot>后备内容</slot> -->
      <div>
        <slot name="conent">内容</slot>
      </div>
      <div>
        <slot name="footer" :msg="msg" age="20">底部</slot>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '作用域插槽'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
