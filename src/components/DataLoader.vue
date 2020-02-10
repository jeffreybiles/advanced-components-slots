<template>
  <div>
    <p v-if="error"><slot name="error" :error="error">{{error}}</slot></p>
    <p v-else-if="loading"><slot name="loading">Please wait while we load {{outputName}}</slot></p>
    <span v-else>
      <slot :results="results" />
    </span>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    data(){
      return {
        results: null,
        error: '',
        loading: false,
      }
    },
    watch: {
      'endpoint': function(newEndpoint) {
        this.findData(newEndpoint)
      }
    },
    created(){
      this.findData(this.endpoint);
    },
    methods: {
      async findData(endpoint){
        this.loading = true;
        try {
          let response = await this.axios.get(endpoint);
          this.results = response.data;
          this.error = ''
        } catch(error) {
          this.error = `There was an error: ${error}`
        }
        this.loading = false;
      }
    },
    props: {
      endpoint: {
        type: String,
        required: true
      },
      outputName: {
        type: String,
        default: "your data"
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>