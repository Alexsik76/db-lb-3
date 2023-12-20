<script setup>
import { useFetch } from '@vueuse/core';
import { get_url, sql_query } from '/src/helpers/helpers.js'
import Table from './Table.vue'

const url_part = 'sql'
const url = get_url(url_part)
const { execute, data, error, isFetching } = useFetch(url, { immediate: false })
    .post(() => sql_query.s_query)
    .json()
</script>

<template>
    <div class="row">
        <div class="row__element">
            <form action="none">
                <fieldset>
                    <legend>SQL запит</legend>
                    <textarea ref="t_area" id="sql-input" rows="10" cols="50" v-model="sql_query.s_query"
                        placeholder="Add sql query">
                    </textarea>
                    <button id="sql-btn" type="button" @click="execute">Надіслати запит</button>
                </fieldset>
            </form>
        </div>
        <div v-if="isFetching" class="row__element">
            <p class="centered">
            <h2>Fetching ...</h2>
            </p>
        </div>
        <div v-else-if="error" class="row__element">
            <p class="centered">
            <h2>{{ error }}</h2>
            </p>
        </div>
        <div v-else-if="data?.result" class="row__element row__element--scroll">
            <div v-if="'error' in data.result">
                <p class="centered">
                <h2>{{ data.result.error }}</h2>
                </p>
            </div>
            <div v-else>
                <Table :data="data.result" />
            </div>
        </div>
        <div v-else class="row__element">
            <p class="centered">
            <h2>Waiting for the request.</h2>
            <h3>select * from car</h3>
            </p>
        </div>
    </div>
</template>