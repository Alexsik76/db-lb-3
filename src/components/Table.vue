<script setup>
defineProps({
  data: Object,
}
)
</script>

<template>
  <table v-if="data">
    <thead>
      <tr>
        <th v-for="(_, key) in data[0]">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data">
        <td v-for="value in row">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>