<script setup>
defineProps({
    name: String
})
const model = defineModel()
</script>

<template>
    <input class="text-input" type="text" 
    :id="name" 
    :name="name"
    v-model="model"
    :placeholder="name">
</template>