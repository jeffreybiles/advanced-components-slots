<template>
  <div>
    <p v-if="!input"><slot name="no-input">Please enter {{inputName}}</slot></p>
    <p v-else-if="error"><slot name="error" :error="error">{{error}}</slot></p>
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
      'input': function(newInput) {
        this.findData(newInput)
      }
    },
    created(){
      this.findData(this.input);
    },
    methods: {
      async findData(username){
        if(!username) {
          this.results = null;
        } else {
          this.loading = true;
          try {
            let response = await this.axios.get(this.endpoint);
            this.results = response.data;
            this.error = ''
          } catch(error) {
            this.error = `There was an error: ${error}`
          }
          this.loading = false;
        }        
      }
    },
    props: {
      input: {
        type: String,
        default: 'vuejs'
      },
      endpoint: {
        type: String,
        required: true
      },
      outputName: {
        type: String,
        default: "your data"
      }
      // 
    }
  }
</script>

<style lang="scss" scoped>

</style>