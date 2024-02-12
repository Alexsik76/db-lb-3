<script setup>
import { useApiFetch } from '/src/helpers/helpers.js';
import { sql_query } from '/src/helpers/helpers.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTableColumn, mdiTable } from '@mdi/js';

const { isFetching, error, data } = useApiFetch('schema').get().json()


</script>
<template>
    <div class="row">
        <div class="row__element">
            <div v-if="data && !isFetching && !error">
                <div class="info-row" v-for="table in data">
                    <div class="info-table-name">
                        <div class="cell"><svg-icon type="mdi" :path="mdiTable"></svg-icon></div>
                        <div class="cell">{{ table.TABLE_NAME }}</div>
                    </div>
                    <div class="info-column-name" v-for="column in table.COLUMNS" :key="column.COLUMN_NAME"
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

