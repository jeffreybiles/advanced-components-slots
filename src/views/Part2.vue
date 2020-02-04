<template>
  <div>
    <h1>Slots II</h1>
    Enter an organization's name, then hit enter to load their projects.<br>
    <input v-model="newUsername" @keydown.enter="username = newUsername" />
    
    <GHTable :username="username" />
  </div>
</template>

<script>
  import GHTable from '@/components/GHTable.vue';

  export default {
    components: {
      GHTable
    },
    data(){
      return {
        username: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>