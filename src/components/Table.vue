<script setup>
import query  from './../helpers/fetch_sql.js';
console.log(query)
// const {isLoading, hasEroor, errorMessage, data} = useQuery()
// console.log('data = ', data, isLoading, errorMessage)
</script>

<template>
 <div class="main_table">
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>brand</th>
        <th>made in</th>
        <th>delivery date</th>
        <th>amount</th>
        <th>price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>brand</td>
        <td>made_in</td>
        <td>delivery_date</td>
        <td>amount</td>
        <td>price</td>
      </tr>
    </tbody>
  </table>
 </div>
</template>

<style scoped>

</style>
