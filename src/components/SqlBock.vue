<script setup>
import { ref, computed, onBeforeMount} from 'vue';
import { useApiFetch, sql_query } from '/src/helpers/helpers.js';
import Table from './Table.vue'
import TabBtn from './TabBtn.vue'
import InsertForm from './InsertForm.vue'
import DeleteForm from './DeleteForm.vue'
import UpdateForm from './UpdateForm.vue'
const type_query = ref('join')
const allow_query = ref(false)
const allQueries = ref()

onBeforeMount(async () => {
  const response = await fetch("/queries.json");
  allQueries.value = await response.json();
});

const forms = {
    InsertForm,
    DeleteForm,
    UpdateForm
}

const form = computed(
    () => {
        if(allQueries.value){
            let form = allQueries.value[type_query.value]['form']
            return forms[form]
        }
    } 
)

const { execute, data, error, isFetching } = useApiFetch('sql', {
    immediate: false
})
    .post(() => sql_query.s_query)
    .json()

function simple_query(event) {
    sql_query.s_query = allQueries.value[type_query.value].buttons[event.target.value];
    execute();
}

function change_type(value) {
    type_query.value = value;

}

const selected_buttons = computed(() => {
    if (type_query.value && allQueries.value) {
        return allQueries.value[type_query.value].buttons;
    }
});
function fill_table() {
    let query = "SELECT * from car"
    sql_query.s_query = query
    execute()
}

const prettied = computed(()=>{
    let value = ""
    if(sql_query.s_query){
        value =  sql_query.s_query;
    }
    else {
        value = "-- Example Query \nSELECT * FROM car;"
    }
    let innerHtml = PR.prettyPrintOne(value, 'sql')
    return `<pre>${innerHtml}</pre>`
})

</script>

<template>
    <div class="row row--tabs">
        <TabBtn v-for="(_, text, index) in allQueries" :value="text" :title=allQueries[text].title :actual_type="type_query" :key="index"
            @change_type="change_type">
        </TabBtn>
    </div>
    <div class="row">
        <div v-if="selected_buttons" class="row__element">
            <button v-for="(_, text, index) in selected_buttons" class="simple-sql-btn" type="button" @click="simple_query"
                :value="text" :key="index">
                {{ text }}
            </button>
        </div>
        <div class="row__element row__element--end">
            <input type="checkbox" id="allow_query" name="allow_query" v-model="allow_query">
            <label for="allow_query"> Дозволити довільні запити</label>
        </div>
    </div>
    <div class="row row--max">
       
        <div class="row__element row__element--col">
            <component v-if="form" :is="form" @executeQuery="execute"/>
            <form v-if="allow_query" action="none">
                <fieldset>
                    <legend>SQL запит</legend>
                    <textarea id="sql-input" rows="8" v-model="sql_query.s_query" placeholder="Add sql query">
                    </textarea>
                    <br />
                    <button id="sql-btn" type="button" @click="execute">Надіслати запит</button>
                </fieldset>
            </form>
            <div v-else class="pre" v-html="prettied"></div>
        </div>
        <div v-if="isFetching" class="row__element">
            <p class="centered">
            <h2>Fetching ...</h2>
            </p>
        </div>
        <div v-else-if="error" class="row__element">
            <p class="centered">
            <h2>{{ error }}</h2>
            <button id="ok-btn" type="button" @click="fill_table">Ок</button>
            </p>
        </div>
        <div v-else-if="data" class="row__element">
            <div class="element" v-if="'error' in data">
                <p class="centered">
                <h2>{{ data.error }}</h2>
                </p>
                <button id="ok-btn" type="button" @click="fill_table">Ок</button>
            </div>
            <div class="element element--centered" v-else-if="'result' in data">
                <p class="centered">
                <h2>{{ data.result }}</h2>
                </p>
                <button id="ok-btn" type="button" @click="fill_table">Ок</button>
            </div>
            <Table v-else :data="data" />
        </div>
        <div v-else class="row__element">
            <p class="centered">
            <h2>Waiting for the request.</h2>
            </p>
        </div>
    </div>
</template>
<style>
@import url('./../styles/pre.css'); 
</style>