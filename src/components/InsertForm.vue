<script setup> 
import { ref, computed} from 'vue';
import InputText from './InputText.vue'
import { useApiFetch } from '/src/helpers/helpers.js';
import { sql_query } from '/src/helpers/helpers.js'

const emit = defineEmits(['executeQuery',])
const { isFetching, error, data } = useApiFetch('schema').get().json()

const select_field = ref(0)
const selected_table = computed(() => {
    return data.value[select_field.value]['TABLE_NAME']
})
const field_names = computed(() => {
    if(data.value && data.value.length != 0) {

        let field_names = data.value[select_field.value]['COLUMNS'].map(item=>item['COLUMN_NAME'])
        for(const field of field_names){
        field_models.value[field] = ""
    }
    return field_names
    }
    })
const field_models = ref({})
function handleForm() {
    let fields = [], values = []
    for (let key of field_names.value){
        if(field_models.value[key]){
            fields.push(key)
            values.push(`"${field_models.value[key]}"`)
        }
    }
    let query = `INSERT INTO ${selected_table.value} (${fields}) VALUES(${values});`
    sql_query.s_query = query
    emit('executeQuery')
}

</script>

<template>
    <form action="none">
        <fieldset>
            <legend>Додавання запису</legend>
            <select name="select-table" 
            id="select-table" 
            v-model="select_field">
                <option value=0>Автомобілі</option>
                <option value=1>Продажі</option>
            </select>
                <InputText v-for="key of field_names"
                :name="key" 
                :key="key"
                v-model="field_models[key]"/>
            <br />
            <button id="insert-btn" type="button" @click="handleForm" 
            >Додати запис</button>
        </fieldset>
    </form>
</template> 