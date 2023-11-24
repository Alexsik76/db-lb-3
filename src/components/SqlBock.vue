<script setup>
import { useFetch } from '@vueuse/core';
import { get_url } from '/src/helpers/helpers.js'
import Table from './Table.vue'
import { ref, computed } from 'vue'

const url_part = 'sql'
const url = get_url(url_part)
const message = ref('')
const args = computed(() => {
    return message.value
})
const { execute, data, error, isFetching } = useFetch(url, { immediate: false },
    {
        beforeFetch({ options }) {
            options.headers = { ...options.headers, ContentType: `text/plain` }
            return {
                options,
            }
        }
    })
    .post(args).json()
function procees_query() {
    execute()
}

</script>
<template>
    <div id="sql" class="block__content">
        <div class="block__row">
            <div class="block__element_external">
                <h2>SQL запит</h2>
                <div class="block__element block__element_form">
                    <div class="block__content">
                        <form action="none">
                            <textarea id="sql-input" rows="10" cols="50" v-model="message"
                                placeholder="Add sql query"></textarea>
                            <button id="sql-btn" type="button" @click="procees_query">Надіслати запит</button>
                        </form>
                    </div>
                </div>
            </div>
            <div v-if="!isFetching" class="block__element_external">
                <h2>Результат запиту</h2>
                <div class="block__element block__element_table" v-if="error">
                    {{ error }}
                </div>
                <div v-else class="block__element block__element_table">
                    <div class="block__content">
                        <Table :data="data" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>