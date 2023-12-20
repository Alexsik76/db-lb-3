<script setup>
import { useFetch } from '@vueuse/core';
import { get_url, sql_query } from '/src/helpers/helpers.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTableColumn, mdiTable } from '@mdi/js';

const url_part = 'schema'
const url = get_url(url_part)
const { isFetching, error, data } = useFetch(url).get().json()

</script>
<template>
    <div class="row">
        <div class="row__element">
            <div v-if="data?.tables && !isFetching && !error">
                <div class="table-row" v-for="table in data.tables">
                    <div class="table-name">
                        <div class="cell"><svg-icon type="mdi" :path="mdiTable"></svg-icon></div>
                        <div class="cell">{{ table.TABLE_NAME }}</div>
                    </div>
                    <div class="column-name" v-for="column in table.columns" :key="column.COLUMN_NAME"
                        @click="sql_query.append(column.COLUMN_NAME)">
                        <span class="tooltip">: [{{ column.DATA_TYPE }}]</span>
                        <div class="cell"><svg-icon type="mdi" :path="mdiTableColumn"></svg-icon></div>
                        <div class="cell">{{ column.COLUMN_NAME }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

