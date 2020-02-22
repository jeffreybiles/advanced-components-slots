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
      <div class="pagination-bar" :pageNumber="pageNumber" :goToPage="goToPage">
        <!-- Left arrow button -->
        <slot name="pagination-button" 
              :goToPage="goToPage" 
              :target="pageNumber - 1" 
              text="&lt;-" 
              :disabled="pageNumber <= 1">
          <button :disabled="pageNumber <= 1" 
                  class="pagination-button"
                  @click="goToPage(pageNumber - 1)"> 
            &lt;- 
          </button>
        </slot>

        <!-- Numbered pagination buttons -->
        <span v-for="(item, index) in new Array(totalPages)" :key="index">
          <slot name="pagination-button" 
                :goToPage="goToPage" 
                :target="index + 1"
                :active="index + 1 == pageNumber"
                :text="index + 1">
            <button @click="goToPage(index + 1)" 
                    :class="['pagination-button', index + 1 == pageNumber ? 'active' : '']">
              {{index + 1}}
            </button>
          </slot>
        </span>

        <!-- Right arrow button -->
        <slot name="pagination-button" 
              :goToPage="goToPage" 
              :target="pageNumber + 1" 
              text="-&gt;"
              :disabled="pageNumber >= totalPages">
          <button :disabled="pageNumber >= totalPages"
                  class="pagination-button"
                  @click="goToPage(pageNumber + 1)">
            -&gt;
          </button>
        </slot>
      </div>
    </slot>
    <slot :perPage="perPage" :pageNumber="pageNumber" :paginatedItems="paginatedItems" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        perPage: this.$route.query.perPage || 25,
        pageNumber: this.$route.query.pageNumber || 1,
        itemsPerPageOptions: [5, 10, 25, 50]
      }
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
  .pagination-button, .pagination-count-button {
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