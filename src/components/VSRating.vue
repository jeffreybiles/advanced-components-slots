<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <span v-if="index <= rating - 1">
        <slot name="filled"><font-awesome-icon icon="star" /></slot>
      </span>
      <span v-else-if="rating - index == 0.5">
        <slot name="half-filled"><font-awesome-icon icon="star-half-alt" /></slot>
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