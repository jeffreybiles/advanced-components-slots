<template>
  <div>
    <h1>Slots II</h1>

    <VSTable v-if="projects.length"
             :items="projects">
             
      <template #item.stargazers="{item}">
        {{item.stargazers_count}} <font-awesome-icon icon="star" />
      </template>
      <template #item.openIssues="{item}">
        {{item.open_issues}} issues
      </template>

      <template #head.stargazers>
        <font-awesome-icon icon="star" />
        <font-awesome-icon icon="star" />
        <font-awesome-icon icon="star" />
      </template>
      <template #head.openIssues>
        Here Be Dragons
        <font-awesome-icon icon="dragon" />
      </template>

      <template #foot.stargazers="{items}">{{sumBy(items, 'stargazers_count')}}</template>
      <template #foot.openIssues="{items}">{{sumBy(items, 'open_issues')}}</template>
    </VSTable>
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