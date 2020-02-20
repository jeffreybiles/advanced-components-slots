<template>
  <div>
    <div v-if="loading">
      <slot name="loading">
        <Spinner />

      </slot>
      <slot name="loading-message">Loading your data...</slot>
    </div>

    <slot name="loaded" v-else :data="data" />
  </div>
</template>

<script>
  import _ from 'lodash'
  import Spinner from '@/components/Spinner.vue';
  export default {
    data(){
      return {
        data: null,
        loading: false,
      }
    },
    components: {
      Spinner
    },
    created(){
      this.findData()
    },
    watch: {
      endpoint: _.debounce(function(){
        this.findData();
      }, 300)
    },
    methods: {
      async findData(){
        this.loading = true;
        let results = await this.axios.get(this.endpoint, {
          headers: {
            'Authorization': `token ${this.authToken}`
          }
        });
        this.data = results.data;
        this.loading = false;
      },
    },
    props: {
      endpoint: {
        type: String,
        required: true
      },
      authToken: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>