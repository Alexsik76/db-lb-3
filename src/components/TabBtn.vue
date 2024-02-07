<script setup>
const props = defineProps({
    value: String,
    actual_type: String,
    title: String,
    key: Number
})
const isActive = () => props.value == props.actual_type ? "active" : "";

</script>
<template>
    <button class="tab-btn" type="button" @click="$emit('change_type', value)" :class="isActive()" :key="key">{{title}}</button>
</template>