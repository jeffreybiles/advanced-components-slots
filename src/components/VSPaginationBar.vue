<template>
  <div>
      <slot name="pagination-button" 
            :isDisabled="pageNumber <= 1"
            :text="'&lt;-'"
            :target="pageNumber - 1"
            :changePageNumber="changePageNumber">
        <button class="pagination-button"
                :disabled="pageNumber <= 1"
                @click="changePageNumber(pageNumber - 1)">
          &lt;- 
        </button>
      </slot>
      <span v-for="(item, index) in new Array(numberPages)" :key="index">
        <slot name="pagination-button" 
              :isActive="pageNumber == index + 1"
              :text="index + 1"
              :target="index + 1"
              :changePageNumber="changePageNumber">
          <button :class="['pagination-button', pageNumber == index + 1 ? 'active' : '']"
                  @click="changePageNumber(index + 1)">
            {{index + 1}}
          </button>
        </slot>
      </span>
      <slot name="pagination-button" 
            :isDisabled="pageNumber >= numberPages"
            :text="'-&gt;'"
            :target="pageNumber + 1"
            :changePageNumber="changePageNumber">
        <button class="pagination-button"
                :disabled="pageNumber >= numberPages"
                @click="changePageNumber(pageNumber + 1)">
          -&gt;
        </button>
      </slot>
  </div>
</template>

<script>
  export default {
    props: {
      changePageNumber: {
        type: Function,
        required: true
      },
      pageNumber: {
        type: [Number, String],
        required: true
      },
      numberPages: {
        type: Number,
        required:  true
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
</style>