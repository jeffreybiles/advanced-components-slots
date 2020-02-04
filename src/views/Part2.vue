<template>
  <div>
    <h1>Slots II</h1>
    Enter an organization's name, then hit enter to load their projects.<br>
    <input v-model="newUsername" @keydown.enter="username = newUsername" />
    
    <GitHubProjectLoader :username="username" v-slot="{projects, totalStargazers, totalOpenIssues}">
      <VSTable :headers="headers" :items="projects">
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
            <td>{{totalStargazers}}</td>
            <td></td>
            <td>{{totalOpenIssues}}</td>
            <td></td>
          </tr>
        </template>
      </VSTable>
    </GitHubProjectLoader>
  </div>
</template>

<script>
  import GitHubProjectLoader from '@/components/GitHubProjectLoader.vue';
  import VSButton from '@/components/VSButton.vue';
  import VSTable from '@/components/VSTable.vue';

  export default {
    components: {
      GitHubProjectLoader,
      VSButton,
      VSTable
    },
    data(){
      return {
        username: 'vuejs',
        newUsername: 'vuejs',
        headers: [
          {id: 'name', name: 'Name', sortBy: 'name'},
          {id: 'stargazers', name: 'Stargazers', sortBy: 'stargazers_count'},
          {id: 'language', name: 'Language', sortBy: 'language'},
          {id: 'issues', name: 'Open Issues', sortBy: 'open_issues'},
          {id: 'actions', name: 'Actions', sortBy: ''}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>