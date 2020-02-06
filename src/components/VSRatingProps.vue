<template>
  <div>
    <span v-for="(item, index) in new Array(maxRating)" :key="index">
      <slot :isFilled="index <= roundedRating - 1" :halfFilled="roundedRating - index == 0.5">
        <font-awesome-icon icon="star" v-if="index <= roundedRating - 1" />
        <font-awesome-icon icon="star-half-alt" v-else-if="roundedRating - index == 0.5" />
        <font-awesome-icon :icon="['far', 'star']" v-else />
      </slot>
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      roundedRating(){
        return Math.round(2 * this.rating) / 2
      }
    },
    props: {
      rating: {
        type: Number,
        required: true
      },
      maxRating: {
        type: Number,
        default: 5
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>