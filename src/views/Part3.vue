<template>
  <div>
    <h1>Slots III</h1>

    <input v-model="orgName" />


    <DataLoader :endpoint="`https://api.github.com/orgs/${orgName}`" :authToken="authToken">
      <template #loaded="{data}">
        <VSPagination :totalItems="data.public_repos">
          <template #pagination-button="{goToPage, target, text, disabled, active}">
            <VSButton @click="goToPage(target)" :disabled="disabled" :class="[active ? 'active' : '']">{{text}}</VSButton>
          </template>
          <template #pagination-per-page-button="{isActive, perPage, changePerPage}">
            <button @click="changePerPage(perPage)"
                    :class="[isActive ? 'active' : '']"
                    class="green-button">
              {{perPage}}
            </button>
          </template>
          <template #default="{pageNumber, perPage}">
            <DataLoader :endpoint="`https://api.github.com/orgs/${orgName}/repos?page=${pageNumber}&per_page=${perPage}`" 
                        :authToken="authToken">
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
          </template>
        </VSPagination>
      </template>
    </DataLoader>
  </div>
</template>

<script>
  import VSTable from '@/components/VSTable.vue';
  import VSButton from '@/components/VSButton.vue';
  import DataLoader from '@/components/DataLoader.vue';
  import VSPagination from '@/components/VSPagination.vue';
  import _ from 'lodash';

  export default {
    components: {
      VSTable,
      VSPagination,
      VSButton,
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
        authToken: process.env.VUE_APP_GITHUB_AUTH,
        perPage: 20
      }
    },
    watch: {
      orgName(newName, oldName) {
        this.$router.push({path: this.$route.path, query: { 
          ...this.$route.query,
          orgName: newName,
          pageNumber: 1, 
        }})
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
  .green-button {
    background-color: #8B8;
    padding: 8px;
    border-radius: 5px;
    margin: 1px;
    font-size: 1em;

    &.active {
      background-color: #050;
      color: white;
    }
  }
</style>