<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers"
            :key="header.name"
            @click="sort(header.sortBy)">
          <slot :name="`header.${header.id}`">
            {{header.name}}
          </slot>
          <span v-if="header.sortBy == sortBy">
            <font-awesome-icon icon="arrow-down" v-if="sortDescending" />
            <font-awesome-icon icon="arrow-up" v-else />
          </span>
        </th>
      </tr>
    </thead>
    <tfoot>
      <slot name="footer"></slot>
    </tfoot>
    <tbody>
      <tr v-for="item in sortedTableItems" 
          :key="item.id"
          :class="`${item.highlighted ? 'highlighted' : 'normal'}`">
        <slot name="row" :item="item" :remove="remove" :highlight="highlight" >
          <td v-for="header in headers" :key="`${header.id}-${item.id}`">
            <slot :name="`column.${header.id}`" :item="item" :highlight="highlight" :remove="remove">
              <span v-if="header.id == 'actions'">
                <button @click="highlight(item)">Highlight</button>
                <button @click="remove(item)">Remove</button>
              </span>
              <span v-else>
                {{item[header.sortBy]}}
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
        sortBy: '',
        sortDescending: true,
        tableItems: this.items
      }
    },
    computed: {
      sortedTableItems(){
        let sortBy = this.sortBy;
        return this.tableItems.sort((p1, p2) => {
          let p1Greater = p1[sortBy] > p2[sortBy];
          if(p1Greater ? this.sortDescending : !this.sortDescending) {
            return -1
          } else {
            return 1
          }
        })
      }
    },
    methods: {
      highlight(item) {
        item.highlighted = !item.highlighted
        let index = this.tableItems.findIndex(p => p.id === item.id)
        Vue.set(this.tableItems, index, item)
      },
      remove(item) {
        let index = this.tableItems.findIndex(p => p.id === item.id)
        this.tableItems.splice(index, 1)
      },
      sort(newSort) {
        if(this.sortBy == newSort) {
          this.sortDescending = !this.sortDescending;
        }
        this.sortBy = newSort;
      }
    },
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        default: []
      }
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