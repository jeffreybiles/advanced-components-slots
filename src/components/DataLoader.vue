<template>
  <div>
    <slot name="loaded" :data="data" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        data: null
      }
    },

    created(){
      this.findData()
    },
    watch: {
      endpoint: function(){
        this.findData();
      }
    },
    methods: {
      async findData(){
        let results = await this.axios.get(this.endpoint, {
          headers: {
            'Authorization': `token ${this.authToken}`
          }
        });
        this.data = results.data;
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