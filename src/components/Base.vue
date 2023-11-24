<script setup>
import Info from './Info.vue';
import SqlBlock from './SqlBock.vue';
</script>

<template>
  <div class="block">
    <div class="block__coll">
      <div class="block__element block__element_navbar">
        <div class="block__content">
          Navbar
        </div>
      </div>
      <div class="block__element block__element_main">
        <Info />
        <div id="separator" class="block__content">
        <hr>
        </div>
        <SqlBlock />
      </div>
      <div class="block__element block__element_footer">
        <div class="block__content">
          Footer
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
