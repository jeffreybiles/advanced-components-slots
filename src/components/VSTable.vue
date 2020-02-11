<template>
  <table v-if="items">
    <thead>
      <slot name="head">
        <th v-for="column in columns"
            :key="column.id">
          <slot :name="`head.${column.id}`">
            {{column.name}}
          </slot>
        </th>
      </slot>
    </thead>
    <tfoot>
      <tr>
        <slot name="foot" :items="items">
          <td v-for="column in columns"
              :key="column.id">
            <slot :name="`foot.${column.id}`" :items="items"/>
          </td>
        </slot>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="item in items" 
          :key="item.id"
          :class="`${item.highlighted ? 'highlighted' : 'normal'}`">
        <slot name="item" :item="item" :highlight="highlight" :remove="remove">
          <td v-for="column in columns" :key="column.id">
            <slot :name="`item.${column.id}`" :item="item" :highlight="highlight" :remove="remove">
              <span v-if="column.id == 'actions'">
                <button @click="highlight(item)">Highlight</button>
                <button @click="remove(item)">Remove</button>
              </span>
              <span v-else>
                {{item[column.propertyName]}}
              </span>
            </slot>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Vue from 'vue';

  export default {
    data(){
      return {
        columns: [
          {id: 'name', propertyName: 'name', name: "Name"},
          {id: 'stargazers', propertyName: 'stargazers_count', name: "Stargazers Count"},
          {id: 'language', propertyName: 'language', name: "Language"},
          {id: 'openIssues', propertyName: 'open_issues', name: "Open Issues"},
          {id: 'actions', name: "Actions"}
        ]
      }
    },
    methods: {
      highlight(item) {
        item.highlighted = !item.highlighted;
        let index = this.items.findIndex(i => i.id === item.id);
        Vue.set(this.items, index, item);
      },
      remove(item) {
        let index = this.items.findIndex(i => i.id === item.id)
        this.items.splice(index, 1)
      }
    },
    props: {
      items: {
        type: Array,
        required: true
      },
    }
  }
</script>

<style lang="scss" scoped>
table {
  margin: auto;
  border-collapse: collapse;

  tr {
    &.highlighted {
      background-color: #8FEE90;
    }
    td, th {
      padding: 0.5rem;
      text-align: left;
    }
    th {
      border-bottom: 1px solid #999;
    }
    &:nth-child(2n) {
      background-color: #DDD;

      &.highlighted {
        background-color: #7FDE80
      }
    }
  }

  tfoot {
    td {
      border-top: 1px solid black;
    }
  }
}
</style>