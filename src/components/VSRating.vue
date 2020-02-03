<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <span v-if="index <= rating - 1">
        <slot><font-awesome-icon icon="star" /></slot>
      </span>
      <span v-else>
        <slot name="unfilled"><font-awesome-icon :icon="['far', 'star']" /></slot>
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