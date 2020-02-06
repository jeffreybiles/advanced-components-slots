<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <slot :isFilled="index <= rating - 1" :halfFilled="rating - index == 0.5">
        <font-awesome-icon icon="star" v-if="index <= rating - 1" />
        <font-awesome-icon icon="star-half-alt" v-else-if="rating - index == 0.5" />
        <font-awesome-icon :icon="['far', 'star']" v-else />
      </slot>
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