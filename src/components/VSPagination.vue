<template>
  <div>
    <slot name="pagination-count">
      <div class="pagination-count">
        <slot name="pagination-per-page-text">Results per page:</slot>
        <span v-for="itemsPerPage in itemsPerPageOptions" :key="itemsPerPage">
          <slot name="pagination-per-page-button" 
                :changePerPage="changePerPage"
                :perPage="itemsPerPage"
                :isActive="perPage == itemsPerPage">
            <button @click="changePerPage(itemsPerPage)"                  
                    :class="['pagination-count-button', perPage == itemsPerPage ? 'active' : '']">
              {{itemsPerPage}}
            </button>
          </slot>
        </span>
      </div>
    </slot>

    <slot name="pagination-bar">
      <VSPaginationBar :pageNumber="pageNumber" :goToPage="goToPage" :totalPages="totalPages">
        <template #pagination-button="{goToPage, target, text, disabled, active}">
          <slot name="pagination-button" 
                :goToPage="goToPage" 
                :target="target" 
                :text="text"
                :active="active"
                :disabled="disabled" />
        </template>
      </VSPaginationBar>
    </slot>
    
    <slot :perPage="perPage" :pageNumber="pageNumber" :paginatedItems="paginatedItems" />

    <slot name="pagination-bar">
      <VSPaginationBar :pageNumber="pageNumber" :goToPage="goToPage" :totalPages="totalPages">
        <template #pagination-button="{goToPage, target, text, disabled, active}">
          <slot name="pagination-button" 
                :goToPage="goToPage" 
                :target="target"
                :text="text"
                :active="active"
                :disabled="disabled" />
        </template>
      </VSPaginationBar>
    </slot>
  </div>
</template>

<script>
  import VSPaginationBar from '@/components/VSPaginationBar.vue';
  export default {
    data(){
      return {
        perPage: this.$route.query.perPage || 25,
        pageNumber: this.$route.query.pageNumber || 1,
        itemsPerPageOptions: [5, 10, 25, 50]
      }
    },
    components: {
      VSPaginationBar
    },
    methods: {
      goToPage(pageNumber) {
        if(pageNumber != this.pageNumber) {
          this.pageNumber = pageNumber
          this.$router.push({path: this.$route.path, query: { 
            ...this.$route.query,
            pageNumber: pageNumber, 
          }})
        }
      },
      changePerPage(resultsPerPage) {
        if(resultsPerPage != this.perPage) {
          this.perPage = resultsPerPage;

          // code so the new results don't 'overshoot' and show empty page
          let newTotalPages = Math.ceil(this.totalItems / resultsPerPage)
          if(this.pageNumber > newTotalPages) {
            this.pageNumber = newTotalPages
          }
          
          this.$router.push({path: this.$route.path, query: {
            ...this.$route.query,
            pageNumber: this.pageNumber,
            perPage: resultsPerPage
          }})
        }
      }
    },
    computed: {
      totalPages(){
        return Math.ceil(this.totalItems / this.perPage);
      },
      paginatedItems(){
        if(this.items) {
          let end = this.perPage * this.pageNumber;
          return this.items.slice(end - this.perPage, end)
        }
      }
    },
    props: {
      totalItems: {
        type: [String, Number],
        default: 0
      },
      items: {
        type: Array,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .pagination-button, .pagination-count-button {
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;

    &.active {
      background-color: #ccc;
    }
  }
</style>