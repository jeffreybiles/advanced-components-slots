<template>
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
</template>

<script>
  export default {
    props: {
      pageNumber: {
        type: [Number, String],
        required: true
      },
      goToPage: {
        type: Function,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>