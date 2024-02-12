<script setup>
import { ref, computed, onMounted } from 'vue';
import InputText from './InputText.vue'
import { useApiFetch } from '/src/helpers/helpers.js';
import { sql_query } from '/src/helpers/helpers.js';
const emit = defineEmits(['executeQuery',])
const { data } = useApiFetch('schema').get().json()


const select_field = ref(0)
const selected_table = computed(() => {
    return data.value[select_field.value]['TABLE_NAME']
})
const field_names = computed(() => {
    if (data.value && data.value.length != 0) {
        let field_names = data.value[select_field.value]['COLUMNS'].map(item => item['COLUMN_NAME'])
        for (const field of field_names) {
            field_models.value[field] = ""
        }
        return field_names
    }
})
const field_models = ref({})
function handleForm() {
    let form = document.getElementById('update-form').getElementsByClassName("text-input");
    let fields = [], values = []
    for (let i=0; i< field_names.value.length; i++ ) {
       
            fields.push(field_names.value[i])
            values.push(`${form[i].value}`)
    }
    let new_values = []
    for(let i=0; i< fields.length; i++){
        new_values.push(`${fields[i]} = "${values[i]}"`)
    }
    let query = `UPDATE ${selected_table.value} SET ${new_values} WHERE ${fields[0]} = ${values[0]};`
    sql_query.s_query = query
    emit('executeQuery')
}
function fill_table() {
    let query = `SELECT * from ${selected_table.value}`
    sql_query.s_query = query
    emit('executeQuery')
}


onMounted(() => {
    sql_query.s_query = "SELECT * from car"
    emit('executeQuery')
})


</script>

<template>
    <form id="update-form" class="filled-form" action="none">
        <fieldset>
            <legend>Оновлення запису</legend>
            <select name="select-table" id="select-table" v-model="select_field" @change="fill_table">
                <option value=0>Автомобілі</option>
                <option value=1>Продажі</option>
            </select>
            <InputText v-for="key of field_names" :name="key" :key="key" v-model="field_models[key]" />
            <br />
            <button id="insert-btn" type="button" @click="handleForm">Змінити запис</button>
        </fieldset>
    </form>
</template> 