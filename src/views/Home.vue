<template>
  <div class="home">
    <VSRating :rating="4" />

    
    <VSRating :rating="4">
      <template #filled>
        <font-awesome-icon icon="circle" />
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
