<template>
  <div>
    <h1>Slots II</h1>
    Enter an organization's name, then hit enter to load their projects.<br>
    <input v-model="username" />
    
    <DataLoader :endpoint="`https://api.github.com/orgs/${username}/repos`" v-slot="{results}">
      <VSTable :headers="headers" :items="results">
        <template #column.stargazers="{item}">
          {{item.stargazers_count}} <font-awesome-icon icon="star" />
        </template>
        <template #column.actions="{item, remove, highlight}">
          <VSButton @click="remove(item)">
            GOODBYE
          </VSButton>
        </template>
        <template #header.stargazers>
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
        </template>
        <template #header.issues>
          Here be <font-awesome-icon icon="dragon" />
        </template>
        <template #footer>
          <tr>
            <td><strong>Totals</strong></td>
            <td>{{sumBy(results, 'stargazers_count')}}</td>
            <td></td>
            <td>{{sumBy(results, 'open_issues')}}</td>
            <td></td>
          </tr>
        </template>
      </VSTable>
    </DataLoader>
  </div>
</template>

<script>
  import VSButton from '@/components/VSButton.vue';
  import VSTable from '@/components/VSTable.vue';
  import DataLoader from '@/components/DataLoader.vue';
  import _ from 'lodash';

  export default {
    components: {
      DataLoader,
      VSButton,
      VSTable
    },
    data(){
      return {
        username: 'vuejs',
        headers: [
          {id: 'name', name: 'Name', sortBy: 'name'},
          {id: 'stargazers', name: 'Stargazers', sortBy: 'stargazers_count'},
          {id: 'language', name: 'Language', sortBy: 'language'},
          {id: 'issues', name: 'Open Issues', sortBy: 'open_issues'},
          {id: 'actions', name: 'Actions', sortBy: ''}
        ],
        
      }
    },
    methods: {
      sumBy(array, property){
        return _.sum(array.map(p => p && p[property]))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>