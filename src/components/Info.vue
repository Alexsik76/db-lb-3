<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core';
import { get_url } from '/src/helpers/helpers.js'

const url_part = 'schema'
const url = get_url(url_part)
const { isFetching, error, data } = useFetch(url).get().json()
const selected = ref()
const columns_by_table = computed(() => {
    let columns = data.value.find((element) => element.table_name === selected.value).columns
    return columns
})
</script>
<template>
    <div id="info" class="block__content">
        <div class="block__row">
            <div class="block__element_external">
                <h2>Таблиці</h2>
                <div class="block__element block__element_form">
                    <div class="block__content" v-if="data && !isFetching && !error">
                        <form action="none">
                            <select :size="data.length" title="Таблиці" v-model="selected">
                                <option v-for="table in data" :value="table.table_name">
                                    {{ table.table_name }}
                                </option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            <div class="block__element_external">
                <h2>Колонки</h2>
                <div class="block__element block__element_table">
                    <div class="block__content">
                        <div class="main_table" v-if="data && !isFetching && !error && selected">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Назва колонки</th>
                                        <th>Тип даних</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="column in columns_by_table">
                                        <td>{{ column.column_name }}</td>
                                        <td>{{ column.data_type }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>