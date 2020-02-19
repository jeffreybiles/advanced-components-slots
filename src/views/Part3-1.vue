<template>
  <div>
    <DataLoader endpoint="https://vue-screencasts-server.herokuapp.com/api/courses">
      <template #loaded="{data}">
        <VSTable :columns="columns" :items="data && data.data.map(c => { return {...c.attributes, id: c.id}}) || []">
          <template #item.difficulty="{item}">
            <span v-if="item.difficulty == 'beginner'" style="color: green;">Easy</span>
            <span v-if="item.difficulty == 'intermediate'" style="color: orange;">Intermediate</span>
            <span v-if="item.difficulty == 'advanced'" style="color: red;">Hard</span>
          </template>
        </VSTable>
      </template>
    </DataLoader>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import DataLoader from '@/components/DataLoader.vue';

  export default {
    components: {
      VSTable,
      DataLoader
    },
    data(){
      return {
        courses: [],
        columns: [
          {id: 'name', name: 'Name', propertyName: 'name'},
          {id: 'difficulty', name: 'Difficulty', propertyName: 'difficulty'},
          {id: 'actions', name: 'Actions'}
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>