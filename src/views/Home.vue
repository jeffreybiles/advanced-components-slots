<template>
  <div class="home">
    <VSRating :rating="3">
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
import VSButton from '@/components/VSButton';
import VSRating from '@/components/VSRating';

export default {
  name: 'home',
  components: {
    VSButton,
    VSRating
  }
}
</script>
