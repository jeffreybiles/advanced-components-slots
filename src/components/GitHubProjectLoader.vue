<template>
  <div>
    <p v-if="!username">Please enter a username</p>
    <p v-else-if="error">{{this.error}}</p>
    <p v-else-if="loading">Please wait while we load {{username}}'s projects</p>
    <span v-else>
      <slot :projects="projects" :totalStargazers="totalStargazers" :totalOpenIssues="totalOpenIssues" />
    </span>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    data(){
      return {
        projects: [],
        error: '',
        loading: false,
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
    computed: {
      totalStargazers(){
        return _.sum(this.projects.map(p => p && p.stargazers_count))
      },
      totalOpenIssues(){
        return _.sum(this.projects.map(p => p && p.open_issues))
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