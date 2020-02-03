<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <span v-if="index <= rating - 1">
        <font-awesome-icon icon="star" />
      </span>
      <span v-else>
        <font-awesome-icon :icon="['far', 'star']" />
      </span>
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