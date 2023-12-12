<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core';
import gsap from 'gsap'
import { get_url } from '/src/helpers/helpers.js'

const url_part = 'schema'
const url = get_url(url_part)
const { isFetching, error, data } = useFetch(url).get().json()
const selected = ref('car')
const columns_by_table = computed(() => {
    let columns = data.value.tables.find((element) => element.TABLE_NAME === selected.value).columns
    return columns
})

</script>
<template>
    <div class="row">
        <div class="row__element" v-if="data?.tables && !isFetching && !error">
            <form action="none">
                <fieldset>
                    <legend>Таблиці</legend>
                    <select id="select" :size="data.tables.length" title="Таблиці" v-model="selected">
                        <option v-for="table in data.tables" :value="table.TABLE_NAME">
                            {{ table.TABLE_NAME }}
                        </option>
                    </select>
                </fieldset>
            </form>
        </div>
        <div class="row__element">
            <div v-if="data?.tables && !isFetching && !error && selected">
                <table>
                    <thead>
                        <tr>
                            <th>Назва колонки</th>
                            <th>Тип даних</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="column in columns_by_table" :key="column.COLUMN_NAME">
                            <td>{{ column.COLUMN_NAME }}</td>
                            <td>{{ column.DATA_TYPE }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

