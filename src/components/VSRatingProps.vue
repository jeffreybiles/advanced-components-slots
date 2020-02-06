<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <font-awesome-icon icon="star" v-if="index <= rating - 1" />
      <font-awesome-icon :icon="['far', 'star']" v-else />
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>