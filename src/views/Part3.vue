<template>
  <div>
    <h1>Slots III</h1>

    <input v-model="orgName" />

    <DataLoader :endpoint="`https://api.github.com/orgs/${this.orgName}/repos`" :authToken="authToken">
      <template #loading-message>
        <h3>Loading your github projects</h3>
      </template>
      <template #error>
        We could not find an organization called <strong>{{orgName}}</strong>
      </template>
      <template #loaded="{data}">
        <VSTable :items="data ||  []"
                :columns="columns">
                
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
      </template>
    </DataLoader>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import DataLoader from '@/components/DataLoader.vue';
  import _ from 'lodash';

  export default {
    components: {
      VSTable,
      DataLoader
    },
    data(){
      return {
        orgName: 'vuejs',
        projects: [],
        columns: [
          {id: 'name', propertyName: 'name', name: "Name"},
          {id: 'stargazers', propertyName: 'stargazers_count', name: "Stargazers Count"},
          {id: 'language', propertyName: 'language', name: "Language"},
          {id: 'openIssues', propertyName: 'open_issues', name: "Open Issues"},
          {id: 'forks', propertyName: 'forks', name: '# of forks'},
          {id: 'actions', name: "Actions"}
        ],
        authToken: process.env.VUE_APP_GITHUB_AUTH
      }
    },
    methods: {
      sumBy(array, property){
        return _.sum(array.map(x => x[property]))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>