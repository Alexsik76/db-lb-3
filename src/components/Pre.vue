<script setup>
defineProps({
    query_text:String
})
</script>
<template>
    <div class="pre">
        <pre v-if="query_text" class="prettyprint lang-sql" @load="PR.prettyPrint()">
            {{ query_text }}
        </pre>
    </div>
</template>    