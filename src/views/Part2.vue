<template>
  <div>
    <h1>Slots II</h1>

    <VSTable v-if="projects.length"
             :items="projects"
             :totalStargazers="sumBy(projects, 'stargazers_count')"
             :totalOpenIssues="sumBy(projects, 'open_issues')"   />
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import _ from 'lodash';

  export default {
    components: {
      VSTable
    },
    data(){
      return {
        username: 'vuejs',
        projects: []
      }
    },
    created(){
      this.findData()
    },
    methods: {
      async findData(){
        let url = `https://api.github.com/orgs/${this.username}/repos`;
        let results = await this.axios.get(url);
        this.projects = results.data;
      },
      sumBy(array, property){
        return _.sum(array.map(x => x[property]))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>