<template>
  <div class="home">
    <VSRatingProps :rating="4" />

    <VSRating :rating="9.2" :maxRating="10">
      <template #filled>
        <font-awesome-icon icon="circle" />
      </template>
      <template #half-filled>
        <font-awesome-icon icon="adjust" />
      </template>
      <template #unfilled>
        <font-awesome-icon :icon="['far', 'circle']" />
      </template>
    </VSRating>
  </div>
</template>

<script>
import VSRating from '@/components/VSRating';
import VSRatingProps from '@/components/VSRatingProps';

export default {
  name: 'home',
  components: {
    VSRating,
    VSRatingProps
  }
}
</script>
