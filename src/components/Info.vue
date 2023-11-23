<script setup>
import { ref } from 'vue'

const selected = ref('A')

const options = ref([
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: 'C' }
])
</script>
<template>
    <div id="info" class="block__content">
        <div class="block__row">
            <div class="block__element_external">
                <h2>Таблиці</h2>
                <div class="block__element block__element_form">
                    <div class="block__content">
                        <form action="none">
                            <select v-model="selected" size="2" title="Таблиці">
                                <option v-for="option in options" :value="option.value">
                                    {{ option.text }}
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
                        <div class="main_table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Назва колонки</th>
                                        <th>Тип даних</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>id</td>
                                        <td>brand</td>
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