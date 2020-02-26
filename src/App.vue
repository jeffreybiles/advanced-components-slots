<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/part-2">Part II</router-link> |
      <router-link to="/part-2-1">Part II+</router-link> |
      <router-link to="/part-3">Part III</router-link> |
      <router-link to="/part-3-1">Part III+</router-link> |
      <router-link to="/pagination">Pagination</router-link> |
      <router-link to="/pagination-1">Pagination+</router-link> |
      <router-link to="/pagination-slots">Pagination Slots</router-link> |
      <router-link to="/pagination-slots-1">Pagination Slots+</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
