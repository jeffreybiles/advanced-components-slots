<template>
  <div>
    <p v-if="!username">Please enter a username</p>
    <p v-else-if="error">{{this.error}}</p>
    <p v-else-if="loading">Please wait while we load {{username}}'s projects</p>
    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stargazers</th>
          <th>Language</th>
          <th>Open Issues</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td><strong>Totals</strong></td>
          <td>{{totalStargazers}}</td>
          <td></td>
          <td>{{totalOpenIssues}}</td>
          <td></td>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="project in projects" 
            :key="project.id"
            @click="highlight(project)"
            :class="`${project.highlighted ? 'highlighted' : 'normal'}`">
          <td>{{project.name}}</td>
          <td>{{project.stargazers_count}}</td>
          <td>{{project.language}}</td>
          <td>{{project.open_issues}}</td>
          <td>
            <button @click="remove(project)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Vue from 'vue';

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
      },
      highlight(project) {
        project.highlighted = !project.highlighted
        let index = this.projects.findIndex(p => p.id === project.id)
        Vue.set(this.projects, index, project)
      },
      remove(project) {
        let index = this.projects.findIndex(p => p.id === project.id)
        this.projects.splice(index, 1)
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
  table {
    margin: auto;
    border-collapse: collapse;

    tr {
      &.highlighted {
        background-color: #8FEE90;
      }
      td, th {
        padding: 0.5rem;
        text-align: left;
      }
      th {
        border-bottom: 1px solid #999;
      }
      &:nth-child(2n) {
        background-color: #DDD;

        &.highlighted {
          background-color: #7FDE80
        }
      }
    }
    tfoot {
      td {
        border-top: 1px solid black;
      }
    }
  }
</style>