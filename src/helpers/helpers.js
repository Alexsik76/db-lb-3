import { reactive } from 'vue';
import { createFetch } from '@vueuse/core';

export const useApiFetch = createFetch({
  baseUrl: "https://db-api.zpi-zp31.vn.ua/api/",
});

export const sql_query = reactive({
  s_query: "",
  append(col_name) {
    let pos = document.getElementById('sql-input').selectionStart;
    let new_query = this.s_query.slice(0, pos) + ' ' + col_name + ', ' + this.s_query.slice(pos);
    this.s_query = new_query;
  },
});