<script setup>
import Info from './Info.vue';
import SqlBlock from './SqlBock.vue';

</script>

<template>
  <div class="content">
    <div class="content__navbar">
      
      <Info/>
    </div>
    <div class="content__main">
      <Info @add-column="func"/>
      <hr>
      <SqlBlock @append-column="func"/>
    <div class="content__main"> 
      <SqlBlock/>
    </div>
    <div class="content__footer">
      Footer
    </div>
  </div>
  </div>
</template>

<style scoped></style>
