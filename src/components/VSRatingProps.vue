<template>
  <div>
    <span v-for="(item, index) in new Array(maxRating)" :key="index">
      <Let :val="index <= roundedRating - 1" v-slot="{val: isFilled}">
        <Let :val="roundedRating - index == 0.5" v-slot="{val: isHalf}">
          <slot :isFilled="isFilled" :halfFilled="isHalf">
            <font-awesome-icon icon="star" v-if="isFilled" />
            <font-awesome-icon icon="star-half-alt" v-else-if="isHalf" />
            <font-awesome-icon :icon="['far', 'star']" v-else />
          </slot>
        </Let>
      </Let>
    </span>
  </div>
</template>

<script>
  import Let from '@/components/Let.vue';
  export default {
    components: {
      Let
    },
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