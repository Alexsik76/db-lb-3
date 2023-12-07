<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  data: Object,
}
)
function cell_width() {
  let lenght = Object.keys(props.data[0]).length;
  console.log('props:', lenght);
  width.value = `${100/lenght}%`;
}
onMounted(() =>{
  cell_width()
})


const width = ref('200px')
</script>

<template>
  <table class="fixed-header" v-if="data">
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

</style>