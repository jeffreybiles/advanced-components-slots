<template>
  <div>
    <span v-for="(item, index) in new Array(5)" :key="index">
      <!-- <slot :isFilled="index <= calculatedRating - 1" :isHalf="calculatedRating - index == 0.5">
        <font-awesome-icon icon="star" v-if="index <= calculatedRating - 1" />
        <font-awesome-icon icon="star-half-alt" v-else-if="calculatedRating - index == 0.5" />
        <font-awesome-icon :icon="['far', 'star']" v-else />
      </slot> -->
      <span v-if="index <= calculatedRating - 1">
        <slot><font-awesome-icon icon="star" /></slot>
      </span>
      <span v-else-if="calculatedRating - index == 0.5">
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
    computed: {
      calculatedRating(){
        let rating = this.rating;
        if(this.fromHundred) {
          rating = rating / 20
        }
        return Math.round(rating * 2)/2
      }
    },
    props: {
      rating: {
        type: Number,
        required: true
      },
      fromHundred: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>