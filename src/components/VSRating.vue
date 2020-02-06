<template>
  <div>
    <span v-for="(item, index) in new Array(maxRating)" :key="index">
      <span v-if="index <= roundedRating - 1">
        <slot name="filled">
          <font-awesome-icon icon="star" />
        </slot>
      </span>
      <span v-else-if="roundedRating - index == 0.5">
        <slot name="half-filled">
          <font-awesome-icon icon="star-half-alt" />
        </slot>
      </span>
      <span v-else>
        <slot name="unfilled">
          <font-awesome-icon :icon="['far', 'star']" />
        </slot>
      </span>
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