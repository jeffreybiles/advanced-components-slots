<template>
  <div>
    <DataLoader endpoint="https://vue-screencasts-server.herokuapp.com/api/courses" v-slot="{results}">
      <VSTable :items="results.data.map(i => i.attributes)" :headers="headers">

      </VSTable>
    </DataLoader>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import DataLoader from '@/components/DataLoader.vue';

  export default {
    components: {
      DataLoader,
      VSTable
    },
    data(){
      return {
        headers: [
          {id: 'name', name: 'Name', sortBy: 'name'},
          {id: 'difficulty', name: 'Difficulty', sortBy: 'difficulty'}
        ]
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>