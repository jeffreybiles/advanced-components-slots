<template>
  <div class="home">
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
  </div>
</template>

<script>
import VSButton from '@/components/VSButton';

export default {
  name: 'home',
  components: {
    VSButton
  }
}
</script>
