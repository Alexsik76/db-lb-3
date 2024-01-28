<script setup>
import { useMyFetch } from '/src/helpers/helpers.js';
import { sql_query, all_queries } from '/src/helpers/helpers.js'
import Table from './Table.vue'

const url_part = 'sql'
const { execute, data, error, isFetching } = useMyFetch(url_part, { 
    immediate: false })
    .post(() => sql_query.s_query)
    .json()

function simple_query(event) {
    sql_query.s_query = event.target.value;
    execute();
}

</script>

<template>
    <div class="row">
        <div class="row__element">
            <button v-for="(value, text, index) in all_queries" class="simple-sql-btn" type="button" @click="simple_query"
                :value="value" :key="index">{{ text }}</button>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="row__element">
            <form action="none">
                <fieldset>
                    <legend>SQL запит</legend>
                    <textarea ref="t_area" id="sql-input" rows="10"  v-model="sql_query.s_query"
                        placeholder="Add sql query">
                    </textarea>
                    <br/>
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
        <div v-else-if="data?.result" class="row__element">
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