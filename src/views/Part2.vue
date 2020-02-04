<template>
  <div>
    <h1>Slots II</h1>
    Enter an organization's name, then hit enter to load their projects.<br>
    <input v-model="newUsername" @keydown.enter="username = newUsername" />
    
    <GHTable :username="username">
      <template #column.stargazers="{project}">
        {{project.stargazers_count}} <font-awesome-icon icon="star" />
      </template>
      <template #column.actions="{project, remove, highlight}">
        <VSButton @click="remove(project)">
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
    </GHTable>
  </div>
</template>

<script>
  import GHTable from '@/components/GHTable.vue';
  import VSButton from '@/components/VSButton.vue';

  export default {
    components: {
      GHTable,
      VSButton
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