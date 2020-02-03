<template>
  <div class="home">
    <VSRating :rating="3.5" />
    <VSRating :rating="2.5">
      <template #default="{isFilled, isHalf}">
        <font-awesome-icon icon="circle" v-if="isFilled" />
        <font-awesome-icon icon="adjust" v-else-if="isHalf" />
        <font-awesome-icon :icon="['far', 'circle']" v-else />
      </template>
    </VSRating>
    <!-- <VSRating :rating="0.5">
      <template #default><font-awesome-icon icon="circle" /></template>
      <template #half-filled><font-awesome-icon icon="adjust" /></template>
      <template #unfilled><font-awesome-icon :icon="['far', 'circle']" /></template>
    </VSRating> -->
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
