<template>
  <div>
    <h1>Slots II</h1>
    Enter an organization's name, then hit enter to load their projects.<br>
    <input v-model="newUsername" @keydown.enter="username = newUsername" />
    
    <GHTable :username="username">
      <template #row="{project, remove, highlight}">
        <td>{{project.name}}!!!!</td>
        <td>{{project.stargazers_count}} <font-awesome-icon icon="star" /></td>
        <td>{{project.language}}</td>
        <td>{{project.open_issues}}</td>
        <td>
          <button @click="remove(project)">Bye</button>
          <button @click="highlight(project)">Fancy</button>
        </td>
      </template>
    </GHTable>
  </div>
</template>

<script>
  import GHTable from '@/components/GHTable.vue';

  export default {
    components: {
      GHTable
    },
    data(){
      return {
        username: 'vuejs',
        newUsername: 'vuejs'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>