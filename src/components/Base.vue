<script setup>
import Info from './Info.vue';
import SqlBlock from './SqlBock.vue';
function func(col_name){
  console.log('column_added: ', col_name);
  emit
}
</script>

<template>
  <div class="content">
    <div class="content__navbar">
      <Info @add-column="func"/>
    </div>
    <div class="content__main">
      
      <SqlBlock @append-column="func"/>
    </div>
    <div class="content__footer">
      Footer
    </div>
  </div>
</template>

<style scoped></style>
