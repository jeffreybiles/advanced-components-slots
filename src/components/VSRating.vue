<template>
  <div>
    <span v-for="(item, index) in new Array(maxIcons)" :key="index">
      <Let :func="{isFilled: index <= calculatedRating - 1, 
                   isHalf: calculatedRating - index == 0.5}" v-slot="{val: {isFilled, isHalf}}">
        <span @click="changeRating(index + 1)">
          <slot :isFilled="isFilled" :isHalf="isHalf">
            <font-awesome-icon icon="star" v-if="isFilled" />
            <font-awesome-icon icon="star-half-alt" v-else-if="isHalf" />
            <font-awesome-icon :icon="['far', 'star']" v-else />
          </slot>
        </span>
      </Let>

      <!-- <span v-if="index <= calculatedRating - 1">
        <slot><font-awesome-icon icon="star" /></slot>
      </span>
      <span v-else-if="calculatedRating - index == 0.5">
        <slot name="half-filled"><font-awesome-icon icon="star-half-alt" /></slot>
      </span>
      <span v-else>
        <slot name="unfilled"><font-awesome-icon :icon="['far', 'star']" /></slot>
      </span> -->
    </span>
  </div>
</template>

<script>
  import Let from '@/components/Let';
  export default {
    components: {
      Let
    },
    computed: {
      calculatedRating(){
        let rating = this.rating;
        if(this.fromHundred) {
          rating = rating * this.maxIcons / 100;
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
      },
      maxIcons: {
        type: Number,
        default: 5
      },
      changeRating: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>