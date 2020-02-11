<template>
  <table v-if="items">
    <thead>
      <th>Name</th>
      <th>Stargazers</th>
      <th>Language</th>
      <th>Open Issues</th>
      <th>Actions</th>
    </thead>
    <tfoot>
      <tr>
        <td><strong>Totals</strong></td>
        <td>{{totalStargazers}}</td>
        <td></td>
        <td>{{totalOpenIssues}}</td>
        <td></td>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="project in items" :key="project.id">
        <td>{{project.name}}</td>
        <td>{{project.stargazers_count}}</td>
        <td>{{project.language}}</td>
        <td>{{project.open_issues}}</td>
        <td>

        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      totalStargazers: Number,
      totalOpenIssues: Number
    }
  }
</script>

<style lang="scss" scoped>
table {
  margin: auto;
  border-collapse: collapse;

  tr {
    td, th {
      padding: 0.5rem;
      text-align: left;
    }
    th {
      border-bottom: 1px solid #999;
    }
    &:nth-child(2n) {
      background-color: #DDD;
    }
  }

  tfoot {
    td {
      border-top: 1px solid black;
    }
  }
}
</style>