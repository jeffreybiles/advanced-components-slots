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
            'Authorization': `token ${process.env.VUE_APP_GITHUB_AUTH}`
          }
        });
        this.data = results.data;
      },
    },
    props: {
      endpoint: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>