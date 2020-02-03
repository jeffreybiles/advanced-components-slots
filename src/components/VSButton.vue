<template>
  <button class="btn">
    Button
  </button>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  button {
    position: relative;
    padding: 15px;
    border-radius: 5px;
    font-size: 20px;
    background-color: rgb(158, 195, 208);
    border-color: black;
    box-shadow: 2px 2px rgb(39, 39, 196);
    cursor: pointer;

    &:hover {
      box-shadow: 5px 5px rgb(39, 39, 196);
      left: -3px;
      top: -3px;
    }
  }
</style>