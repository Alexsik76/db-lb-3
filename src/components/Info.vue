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
    let columns = data.value.find((element) => element.TABLE_NAME === selected.value).columns
    return columns
})
function onBeforeEnter(el) {
    el.style.opacity = 0
    el.style.height = 0
}

function onEnter(el, done) {
    gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
    })
}

function onLeave(el, done) {
    gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.08,
        onComplete: done
    })
}
</script>
<template>
    <div id="info" class="block__content">
        <div class="block__row">
            <div class="block__element-external">
                <div class="block__element block__element-form" v-if="data && !isFetching && !error">
                        <form action="none">
                            <fieldset>
                                <legend>Таблиці</legend>
                                <select :size="data.length" title="Таблиці" v-model="selected">
                                    <option v-for="table in data" :value="table.TABLE_NAME">
                                        {{ table.TABLE_NAME }}
                                    </option>
                                </select>
                            </fieldset>
                        </form>
                </div>
            </div>
            <div class="block__element-external">
                <h2>Колонки</h2>
                <div class="block__element block__element-table">
                    <div class="block__content">
                        <div class="main-table" v-if="data && !isFetching && !error && selected">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Назва колонки</th>
                                        <th>Тип даних</th>
                                    </tr>
                                </thead>
                                <TransitionGroup tag="tbody" @before-enter="onBeforeEnter" @enter="onEnter">
                                    <tr v-for="(column, index) in columns_by_table" :key="column.COLUMN_NAME"
                                        :data-index="index">
                                        <td>{{ column.COLUMN_NAME }}</td>
                                        <td>{{ column.DATA_TYPE }}</td>
                                    </tr>
                                </TransitionGroup>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

