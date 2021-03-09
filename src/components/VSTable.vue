/* Usage
  VSTable component requires two props
  * Columns, an array of objects
  * Items, an array of objects

  Examples:
  columns: [
    {id: 'name', propertyName: 'name', name: "Name"},
    {id: 'stargazers', propertyName: 'stargazers_count', name: "Stargazers Count"},
  ],
  items: [
    {id: '9a1b772e', stargazers_count: 7, name: 'Small Side Project'},
    {id: 'ac5f10f4', stargazers_count: 180000, name: 'VueJS'}
  ]
  The `propertyName` of each column should contain the key of a property in the items you want to display.
  In this case, the columns have the `name`  and `stargazers_count` propertyNames, and the items have those properties.
  By default, the cell will display {{item[column.propertyName]}}.

  However, you can also use slots to replace what's displayed in any area of the table.

  For example, the following code will replace the default cells in the `stargazers` column.
  This particular slot usage will add commas to the count, then put a star icon at the end.
  
  <VSTable :items="projects"
            :columns="columns">
    <template #item.stargazers="{item}">
      {{Humanize.intComma(item.stargazers_count)}} 
      <font-awesome-icon icon="star" />
    </template>
  </VSTable>

  The slot named #item.stargazers is auto-generated from the columns array, because there is a column with id of stargazers.
  Any id value in the columns array will have an #item.${column.id} slot generated.
  It will also have a #head.${column.id} and #foot.${column.id}
  In addition, you #item, #head, and #foot to replace the template of the entire section

  You can use as many slots as you like to customize a table's display.
  For following extended array of columns:
  columns: [
    {id: 'name', propertyName: 'name', name: "Name"},
    {id: 'stargazers', propertyName: 'stargazers_count', name: "Stargazers Count"},
    {id: 'language', propertyName: 'language', name: "Language"},
    {id: 'openIssues', propertyName: 'open_issues', name: "Open Issues"},
    {id: 'forks', propertyName: 'forks', name: '# of forks'},
    {id: 'watchers', propertyName: 'watchers', name: 'Watchers'},
    {id: 'actions', name: "Actions"}
  ]

  You could use this in your template:
  <VSTable :items="projects"
            :columns="columns">
            
    <template #item.stargazers="{item}">
      {{Humanize.intComma(item.stargazers_count)}} 
      <font-awesome-icon icon="star" />
    </template>
    <template #item.openIssues="{item}">
      {{item.open_issues}} issues
    </template>

    <template #head.stargazers>
      <font-awesome-icon icon="star" />
      <font-awesome-icon icon="star" />
      <font-awesome-icon icon="star" />
    </template>
    <template #head.openIssues>
      Here Be Dragons
      <font-awesome-icon icon="dragon" />
    </template>
    <template #head.watchers>
      Watchers
      <font-awesome-icon icon="eye" />
    </template>

    <template #foot.stargazers="{items}">{{sumBy(items, 'stargazers_count')}}</template>
    <template #foot.openIssues="{items}">{{sumBy(items, 'open_issues')}}</template>
  </VSTable>

  #item.${column.id} and #item slots will have an item object, a highlight function, and a remove function available
  #head.${column.id}, #head, #foot.${column.id}, and #foot slots will have the array of items available, so that calculations can be done
  Be aware that using #item, #head, or #foot will override any customization on the individual columns in that section

  There is a special item column slot, #item.actions, which will give you highlight and remove buttons if you have a column with an id of `actions`
*/

<template>
  <table v-if="items">
    <thead>
      <slot name="head" :items="items">
        <th v-for="column in columns"
            :key="column.id">
          <slot :name="`head.${column.id}`" :items="items">
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
      columns: {
        type: Array,
        required: true
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