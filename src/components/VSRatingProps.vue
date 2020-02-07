<template>
  <div>
    <span v-for="(item, index) in new Array(maxRating)" :key="index">
      <Let :val="index <= roundedRating - 1" v-slot="{val: isFilled}">
        <slot :isFilled="isFilled" :halfFilled="halfFilled(roundedRating, index)">
          <font-awesome-icon icon="star" v-if="isFilled" />
          <font-awesome-icon icon="star-half-alt" v-else-if="halfFilled(roundedRating, index)" />
          <font-awesome-icon :icon="['far', 'star']" v-else />
        </slot>
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
    methods: {
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