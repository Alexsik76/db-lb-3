<script setup>
import {defineModel} from 'vue';
const model = defineModel({ type: String,  default: '' });
</script>
<template>

<select name="sql-types" id="sql-types" v-model="model">
<option disabled value="">--Оберіть тип запиту--</option>
<option value="join">Прості запити</option>
<option value="where">Складна умова</option>
<option value="sum">Підсумковий запит</option>
<option value="asc_desk">Упорядкування</option>
<option value="search">Пошук</option>
</select>
</template>
<style scoped>

</style>