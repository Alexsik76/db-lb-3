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
    <div class="row">
        <div class="row__element">
            <form action="none">
                <fieldset>
                    <legend>SQL запит</legend>
                    <textarea id="sql-input" rows="10" cols="50" v-model="message" placeholder="Add sql query"></textarea>
                    <button id="sql-btn" type="button" @click="execute">Надіслати запит</button>
                </fieldset>
            </form>
        </div>
        <div v-if="isFetching" class="row__element">
            <p>
            <h2>Fetching ...</h2>
            </p>
        </div>
        <div v-else-if="error" class="row__element">
            <p>
            <h2>{{ error }}</h2>
            </p>
        </div>
        <div v-else-if="data?.result" class="row__element row__element--scroll">
            <div v-if="'error' in data.result">
                <p>
                <h2>{{ data.result.error }}</h2>
                </p>
            </div>
            <div v-else>
                <Table :data="data.result" />
            </div>
        </div>
        <div v-else class="row__element">
            <p>
            <h2>Waiting for the request.</h2>
            </p>
        </div>
    </div>
</template>