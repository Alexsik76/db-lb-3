<script setup>
import Info from './Info.vue';
import SqlBlock from './SqlBock.vue';
</script>

<template>
  <div class="content">
    <div class="content__navbar">
      Navbar
    </div>
    <div class="content__main">
      <Info />
      <hr>
      <SqlBlock />
    </div>
    <div class="content__footer">
      Footer
    </div>
  </div>
</template>

<style scoped></style>
