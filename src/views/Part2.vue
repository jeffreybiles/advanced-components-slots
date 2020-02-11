<template>
  <div>
    <h1>Slots II</h1>

    <VSTable v-if="projects.length"
             :items="projects">
      <template #item="{item, highlight, remove}">
        <td>{{item.name}}</td>
        <td>{{item.stargazers_count}} <font-awesome-icon icon="star" /></td>
        <td>{{item.language}}</td>
        <td>{{item.open_issues}} issues</td>
        <td>
          <button @click="highlight(item)">Highlight</button>
          <button @click="remove(item)">Remove</button>
        </td>
      </template>
      <template #head>
        <th>Name</th>
        <th>
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
        </th>
        <th>Language</th>
        <th>Here Be Dragons
          <font-awesome-icon icon="dragon" />
        </th>
        <th>Actions</th>
      </template>
      <template #foot="{items}">
          <td><strong>Totals</strong></td>
          <td>{{sumBy(items, 'stargazers_count')}}</td>
          <td></td>
          <td>{{sumBy(items, 'open_issues')}}</td>
          <td></td>
      </template>
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