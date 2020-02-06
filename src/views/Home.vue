<template>
  <div class="home">
    <VSRating :rating="3.7" />

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

export default {
  name: 'home',
  components: {
    VSRating
  }
}
</script>
