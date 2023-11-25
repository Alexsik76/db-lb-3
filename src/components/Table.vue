<script setup>
defineProps({
  data: Object,
}
)
</script>

<template>
 <div class="main_table">
  <table v-if="data">
    <thead>
      <tr>
        <th v-for="(value, key) in data[0]">
          {{ key }}
        </th>
      </tr>
    </thead>
      <tbody>
      <tr v-for="row in data">
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
