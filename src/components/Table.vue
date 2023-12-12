<script setup>
const props = defineProps({
  data: Object,
}
)

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

<style scoped></style>