<template>
  <div>
    <div class="pagination-row">
      <button class="pagination-button"
              :disabled="pageNumber <= 1"
              @click="pageNumber = pageNumber - 1">
        &lt;- 
      </button>
      <span v-for="(item, index) in new Array(numberPages)" :key="index">
        <button :class="['pagination-button', pageNumber == index + 1 ? 'active' : '']"
                @click="pageNumber = index + 1">
          {{index + 1}}
        </button>
      </span>
      <button class="pagination-button"
              :disabled="pageNumber >= numberPages"
              @click="pageNumber = pageNumber + 1">
        -&gt;
      </button>
    </div>

    <slot name="data" :pageNumber="pageNumber" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        pageNumber: 1,
        perPage: 20
      }
    },
    computed: {
      numberPages(){
        return Math.ceil(this.totalItems / this.perPage)
      }
    },
    props: {
      totalItems: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-button {
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