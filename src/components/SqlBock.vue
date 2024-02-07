<script setup>
import { ref, computed } from 'vue';
import { useApiFetch } from '/src/helpers/helpers.js';
import { sql_query } from '/src/helpers/helpers.js'
import Table from './Table.vue'
import TabBtn from './TabBtn.vue'
import allQueries from './../../queries.json'
const type_query = ref('join')


const { execute, data, error, isFetching } = useApiFetch('sql', {
    immediate: false
})
    .post(() => sql_query.s_query)
    .json()

function simple_query(event) {
    sql_query.s_query = allQueries[type_query.value].buttons[event.target.value];
    execute();
}

function change_type(value) {
    type_query.value = value;

}

const selected_buttons = computed(() => {
    if (type_query.value) {
        return allQueries[type_query.value].buttons;
    }
});

</script>

<template>
    <div class="row row--tabs">
        <TabBtn v-for="_, value in allQueries" :value="value" :title=allQueries[value].title :actual_type="type_query"
            @change_type="change_type">
        </TabBtn>
    </div>
    <div class="row">

        <div class="row__element">
            <button v-for="(_, text, index) in selected_buttons" class="simple-sql-btn" type="button" @click="simple_query"
                :value="text" :key="index">
                {{ text }}
            </button>
        </div>
    </div>
    <hr>
    <div class="row row--max">
        <div class="row__element">
            <form action="none">
                <fieldset>
                    <legend>SQL запит</legend>
                    <textarea class="prettyprint" ref="t_area" id="sql-input" rows="10" v-model="sql_query.s_query"
                        placeholder="Add sql query">
                    </textarea>
                    <br />
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
            <Table v-else :data="data.result" />
        </div>
        <div v-else class="row__element">
            <p class="centered">
            <h2>Waiting for the request.</h2>
            <h3>select * from car</h3>
            </p>
        </div>
    </div>
</template>
<style scoped></style>