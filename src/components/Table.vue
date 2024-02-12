<script setup>
import { computed } from 'vue'
import { fill_form } from '../helpers/helpers';
const props = defineProps({
  data: Object,
}
)

const col_width = computed(() => {
  let el = Object.keys(props.data[0])[0];
  return `${el.length + 2}em`
})
</script>

<template>
  <table>
    <caption>
    Результат
  </caption>
    <thead>
      <tr>
        <th scope="col" v-for="(_, key) in data[0]">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="row in data" :key="row[0]" @click="fill_form">
        <td v-for="value in row">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
	height: 100%;
	padding: 2%;
	border-radius: 0.3em;
	border: 2px solid DimGray;
}
caption{
  width: 5em;
  margin-bottom: -1%;
  margin-left: 2%;
  background-color: Silver;
  font-size: 18px
}

table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

th,
td {
  padding: 0.3em;
  word-wrap: break-word;
  text-align: left;
}

th {
  background-color: gray;
}

th:nth-child(1) {
  border-radius: 0.2em 0 0 0;
  width: v-bind(col_width);
}

th:nth-last-child(1) {
  border-radius: 0 0.2em 0 0;
}

table tbody {
  display: block;
  height: 100%;
  overflow-y: auto;
  scrollbar-color: darkgray Gainsboro;
}

tr:nth-child(odd) {
  background-color: Gainsboro;
}

tr:hover {
  background-color: darkgray;
}

td:nth-child(1) {
  width: v-bind(col_width);
}
</style>