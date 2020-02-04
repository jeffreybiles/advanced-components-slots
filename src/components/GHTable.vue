<template>
  <div>
    <p v-if="!username">Please enter a username</p>
    <p v-else-if="error">{{this.error}}</p>
    <p v-else-if="loading">Please wait while we load {{username}}'s projects</p>
    <table v-else>
      <thead>
        <th>Name</th>
        <th>Stargazers</th>
        <th>Language</th>
        <th>Open Issues</th>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{project.name}}</td>
          <td>{{project.stargazers_count}}</td>
          <td>{{project.language}}</td>
          <td>{{project.open_issues}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        projects: [],
        error: '',
        loading: false
      }
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