<template>
  <div>
    <slot name="pagination-bar">
      <div class="pagination-bar">
        <button @click="goToPage(pageNumber - 1)"> &lt;- </button>
        <span v-for="(item, index) in new Array(totalPages)" :key="index">
          <button @click="goToPage(index + 1)">{{index + 1}}</button>
        </span>
        <button @click="goToPage(pageNumber + 1)"> -&gt; </button>
      </div>
    </slot>
    <slot :perPage="perPage" :pageNumber="pageNumber" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        perPage: this.$route.query.perPage || 20,
        pageNumber: this.$route.query.pageNumber || 1
      }
    },
    methods: {
      goToPage(pageNumber) {
        this.pageNumber = pageNumber
        this.$router.push({path: this.$route.path, query: { pageNumber: pageNumber, perPage: this.perPage}})
      }
    },
    computed: {
      totalPages(){
        return Math.ceil(this.total / this.perPage);
      }
    },
    props: {
      total: {
        type: [String, Number],
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-bar {

  }
</style>