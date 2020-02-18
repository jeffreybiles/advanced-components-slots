<template>
  <div>
    <VSTable :columns="columns" :items="courses">
      <template #item.difficulty="{item}">
        <span v-if="item.difficulty == 'beginner'" style="color: green;">Easy</span>
        <span v-if="item.difficulty == 'intermediate'" style="color: orange;">Intermediate</span>
        <span v-if="item.difficulty == 'advanced'" style="color: red;">Hard</span>
      </template>
    </VSTable>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';

  export default {
    components: {
      VSTable
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
    created(){
      this.findData()
    },
    methods: {
      async findData(){
        let url = 'https://vue-screencasts-server.herokuapp.com/api/courses';
        let results = await this.axios.get(url);
        this.courses = results.data.data.map(c => { return {...c.attributes, id: c.id}})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>