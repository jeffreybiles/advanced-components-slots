<template>
  <div class="home">
    <VSRating :rating="3" />
    <hr>
    <VSButton />
    <VSButton>Custom Text</VSButton>
    <VSButton>
      <template #default>
        Explicit Default Template 
      </template>
    </VSButton>
    <VSButton></VSButton>
    <VSButton>
      <template #default></template>
    </VSButton>
    <VSButton message="Through props" />
    <VSButton message="Which will win?">
      Slots wins in this case
    </VSButton>
    <VSToggle>
      Toggle-able Button!
    </VSToggle>
    <VSToggle :initialState="false">
      Starting off normal
    </VSToggle>
  </div>
</template>

<script>
import VSButton from '@/components/VSButton';
import VSToggle from '@/components/VSToggle';
import VSRating from '@/components/VSRating';

export default {
  name: 'home',
  components: {
    VSButton,
    VSToggle,
    VSRating
  }
}
</script>
