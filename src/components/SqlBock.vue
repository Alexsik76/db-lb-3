<script setup>
import { useFetch } from '@vueuse/core';
import { get_url } from '/src/helpers/helpers.js'
import Table from './Table.vue'
import { ref } from 'vue'

const url_part = 'sql'
const url = get_url(url_part)
const message = ref('')

const { execute, data, error, isFetching } = useFetch(url, { immediate: false },
    {
        beforeFetch({ options }) {
            options.headers = {
                ...options.headers,
                ContentType: `text/plain`
            }
            return {
                options,
            }
        }
    })
    .post(() => message.value)
    .json()

</script>

<template>
    <div id="sql" class="block__content">
        <div class="block__row">
            <div class="block__element-external">
                <h2>SQL запит</h2>
                <div class="block__element block__element-form">
                    <div class="block__content">
                        <form action="none">
                            <textarea id="sql-input" rows="10" cols="50" v-model="message"
                                placeholder="Add sql query"></textarea>
                            <button id="sql-btn" type="button" @click="execute">Надіслати запит</button>
                        </form>
                    </div>
                </div>
            </div>
            <div v-if="isFetching" class="block__element-external">
            Fetching ...
            </div>
            <div v-else-if="error" class="block__element-external">
            {{ error }}
            </div>
            <div v-else-if="data?.result" class="block__element-external">
                <h2>Результат запиту</h2>
                <div class="block__element block__element-table">
                    <div class="block__content">
                        <Table :data="data.result" />
                    </div>
                </div>
            </div>
            <div v-else class="block__element-external">
                <h2>Waiting for the request.</h2>
            </div>
        </div>
    </div>
</template>