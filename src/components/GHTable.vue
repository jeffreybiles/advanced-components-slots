<template>
  <div>
    <p v-if="!username">Please enter a username</p>
    <p v-else-if="error">{{this.error}}</p>
    <p v-else-if="loading">Please wait while we load {{username}}'s projects</p>
    <VSTable v-else :headers="headers" :items="projects">
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
  </div>
</template>

<script>
  import _ from 'lodash';
  import VSTable from '@/components/VSTable.vue';

  export default {
    data(){
      return {
        projects: [],
        error: '',
        loading: false,
        sortBy: 'stargazers_count',
        sortDescending: true,
        headers: [
          {id: 'name', name: 'Name', sortBy: 'name'},
          {id: 'stargazers', name: 'Stargazers', sortBy: 'stargazers_count'},
          {id: 'language', name: 'Language', sortBy: 'language'},
          {id: 'issues', name: 'Open Issues', sortBy: 'open_issues'},
          {id: 'actions', name: 'Actions', sortBy: ''}
        ]
      }
    },
    components: {
      VSTable
    },
    watch: {
      'username': function(newUsername) {
        this.findData(newUsername)
      }
    },
    created(){
      this.findData(this.username);
    },
    methods: {
      async findData(username){
        if(!username) {
          this.projects = []
        } else {
          this.loading = true;
          try {
            let response = await this.axios.get(`https://api.github.com/orgs/${username}/repos`);
            this.projects = response.data;
            this.error = ''
          } catch(error) {
            this.error = "Please enter a valid username."
          }
          this.loading = false;
        }        
      }
    },
    computed: {
      totalStargazers(){
        return _.sum(this.projects.map(p => p.stargazers_count))
      },
      totalOpenIssues(){
        return _.sum(this.projects.map(p => p.open_issues))
      }
    },
    props: {
      username: {
        type: String,
        default: 'vuejs'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>