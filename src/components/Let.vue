<template>
  <span>
    <slot :val="func" />
  </span>
</template>

<script>
  export default {
    props: ['func']
  }
</script>

<style lang="scss" scoped>

</style>