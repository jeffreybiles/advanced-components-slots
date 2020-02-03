<template>
  <button :class="[toggled ? 'toggled' : 'normal']" @click="toggled = !toggled">
    <slot>{{message}}</slot>
  </button>
</template>

<script>
  export default {
    data(){
      return {
        toggled: this.initialState
      }
    },
    props: {
      message: {
        type: String,
        default: "Default Text"
      },
      initialState: {
        type: Boolean,
        default: true
      }
    }
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

    &.toggled {
      background-color: rgb(16, 16, 87);
      color: rgb(213, 216, 250);
    }
  }
</style>