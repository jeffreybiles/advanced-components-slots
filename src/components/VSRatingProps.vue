<template>
  <div>
    <span v-for="(item, index) in new Array(maxRating)" :key="index">
      <slot :isFilled="isFilled(roundedRating, index)" :halfFilled="halfFilled(roundedRating, index)">
        <font-awesome-icon icon="star" v-if="isFilled(roundedRating, index)" />
        <font-awesome-icon icon="star-half-alt" v-else-if="halfFilled(roundedRating, index)" />
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
    methods: {
      isFilled(rating, index) {
        return index <= rating - 1
      },
      halfFilled(rating, index) {
        return rating - index == 0.5
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