<script setup>
const props = defineProps({
  data: Object,
}
)

const get_width = () =>{
  let el = Object.keys(props.data[0])[0];
  console.log(el);
  return `${el.length + 2}em`
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" v-for="(_, key) in data[0]">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row[0]">
        <td v-for="value in row">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table thead tr th:nth-child(1) {
  width: v-bind(get_width());
}
table tbody tr td:nth-child(1) {
  width: v-bind(get_width());
}
</style>