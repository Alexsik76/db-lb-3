<script setup>
defineProps({
  data: Object,
}
)
</script>

<template>
 <div class="main_table">
  <table v-if="data?.result">
    <thead>
      <tr>
        <th v-for="(value, key) in data.result[0]">
          {{ key }}
        </th>
      </tr>
    </thead>
      <tbody>
      <tr v-for="row in data.result">
        <td v-for="(value, key)  in row">  
        {{ value }}
       </td>  
      </tr>
    </tbody>
  </table>
 </div>
</template>

<style scoped>

</style>
