<template>
  <div>
    <DataLoader endpoint="https://vue-screencasts-server.herokuapp.com/api/courses">
      <template #loaded="{data}">
        <VSPagination :totalItems="data.data.length" 
                      :items="data && data.data.map(c => { return {...c.attributes, id: c.id}}) || []">
          <template #default="{paginatedItems}">
            <VSTable :columns="columns" :items="paginatedItems">
              <template #item.difficulty="{item}">
                <span v-if="item.difficulty == 'beginner'" style="color: green;">Easy</span>
                <span v-if="item.difficulty == 'intermediate'" style="color: orange;">Intermediate</span>
                <span v-if="item.difficulty == 'advanced'" style="color: red;">Hard</span>
              </template>
            </VSTable>
          </template>
        </VSPagination>
      </template>
    </DataLoader>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import DataLoader from '@/components/DataLoader.vue';
  import VSPagination from '@/components/VSPagination.vue';

  export default {
    components: {
      VSTable,
      DataLoader,
      VSPagination
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