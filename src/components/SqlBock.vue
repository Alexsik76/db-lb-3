<script setup>
import Table from './Table.vue'
import { ref, computed } from 'vue'
const message = ref('')
const thead = computed(() => {
    if (message.value && message.value.toLocaleLowerCase().includes('from')) {
        let sql_string = message.value
        let thead_str = sql_string.toLocaleLowerCase().trim().substring(7, (sql_string.indexOf('from') - 1))
        let thead_arr = thead_str.split(',')
        let thead_aliased = thead_arr.map(replace_alias)
        console.log(thead_aliased)
        return thead_aliased
    }
}
)
function replace_alias(value) {
    if (value && value.toLocaleLowerCase().includes(' as ')) {
        return value.toLocaleLowerCase().split(' as ')[1].trim()
    }
    return value
}
</script>
<template>
    <div id="sql" class="block__content">
        <div class="block__row">
            <div class="block__element block__element_form">
                <div class="block__content">
                    <form action="none">
                    <textarea id="sql-input" rows="10" cols="50" v-model="message" placeholder="Add sql query"></textarea>
                </form>
                </div>
            </div>
            <div class="block__element block__element_table">
                <div class="block__content">
                    <Table :thead="thead" />
                </div>
            </div>
        </div>
    </div>
</template>