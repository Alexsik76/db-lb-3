<script setup>
defineProps({
  thead: Array
}
)
</script>

<template>
 <div class="main_table">
  <table>
    <thead>
      <tr>
        <th  v-for="th in thead">{{ th }}</th>
        <!-- <th>brand</th>
        <th>made in</th>
        <th>delivery date</th>
        <th>amount</th>
        <th>price</th> -->
      </tr>
    </thead>
    <!-- <tbody>
      <tr>
        <td>id</td>
        <td>brand</td>
        <td>made_in</td>
        <td>delivery_date</td>
        <td>amount</td>
        <td>price</td>
      </tr>
    </tbody> -->
  </table>
 </div>
</template>

<style scoped>

</style>
