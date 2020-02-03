<template>
  <div class="home">
    <VSRating :rating="3" />
    <hr>
    <VSButton />
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
