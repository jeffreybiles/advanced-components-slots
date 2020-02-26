<template>
  <div>
    <div class="pagination-row">
      <span v-for="perPageOption in [5, 10, 25, 50]" :key="perPageOption">
        <slot name="per-page-button" 
              :perPageOption="perPageOption"
              :isActive="perPage == perPageOption"
              :changePerPage="changePerPage">
          <button :class="['per-page-button', perPageOption == perPage ? 'active' : '']"
                  @click="changePerPage(perPageOption)">
            {{perPageOption}}
          </button>
        </slot>
      </span>
    </div>
    <div class="pagination-row">
      <VSPaginationBar :changePageNumber="changePageNumber"
                       :pageNumber="pageNumber"
                       :numberPages="numberPages">
        <template #pagination-button="{isActive, text, changePageNumber, target, isDisabled}">
          <slot name="pagination-button"
                :isActive="isActive"
                :text="text"
                :changePageNumber="changePageNumber"
                :target="target"
                :isDisabled="isDisabled" />
        </template>
      </VSPaginationBar>
    </div>

    <slot name="data" :pageNumber="pageNumber" 
                      :itemsPerPage="perPage"
                      :paginatedItems="paginatedItems" />

    <div class="pagination-row">
      <VSPaginationBar :changePageNumber="changePageNumber"
                        :pageNumber="pageNumber"
                        :numberPages="numberPages">
        <template #pagination-button="{isActive, text, changePageNumber, target, isDisabled}">
          <slot name="pagination-button"
                :isActive="isActive"
                :text="text"
                :changePageNumber="changePageNumber"
                :target="target"
                :isDisabled="isDisabled" />
        </template>
      </VSPaginationBar>
    </div>
  </div>
</template>

<script>
  import VSPaginationBar from '@/components/VSPaginationBar.vue';
  export default {
    components: {
      VSPaginationBar
    },
    data(){
      return {
        pageNumber: Number(this.$route.query.pageNumber) || 1,
        perPage: this.$route.query.perPage || 10
      }
    },
    computed: {
      numberPages(){
        return Math.ceil(this.totalItems / this.perPage)
      },
      paginatedItems(){
        let end = this.perPage * this.pageNumber
        return this.items.slice(end - this.perPage,end);
      }
    },
    methods:  {
      changePageNumber(newPageNumber) {
        if(newPageNumber <= 0) {
          return null;
        }
        if(newPageNumber > this.numberPages) {
          return null;
        }

        this.pageNumber = newPageNumber;
        this.$router.push({path: this.$route.path, query: {
          ...this.$route.query,
          pageNumber: newPageNumber,
        }})
      },
      changePerPage(newPerPage) {
        this.perPage = newPerPage;

        let newNumberPages = Math.ceil(this.totalItems / newPerPage)
        if(newNumberPages <= this.pageNumber) {
          this.pageNumber = newNumberPages
        }

        this.$router.push({path: this.$route.path, query: {
          ...this.$route.query,
          perPage: newPerPage,
          pageNumber: this.pageNumber
        }})
      }
    },
    props: {
      totalItems: {
        type: Number,
        required: true
      },
      items: {
        type: Array,
        default: () => { return [] }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-button, .per-page-button {
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;

    &.active {
      background-color: #ccc;
      cursor: auto;
    }

    &:disabled {
      cursor: auto;
    }
  }

  .pagination-row {
    padding: 5px 0;
  }
</style>