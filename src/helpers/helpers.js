import { reactive } from 'vue';
import { createFetch } from '@vueuse/core';

export const useApiFetch = createFetch({
  baseUrl: import.meta.env.VITE_BASE_API_URL
});

export const sql_query = reactive({
  s_query: "",
  append(col_name) {
    let pos = document.getElementById('sql-input').selectionStart;
    let new_query = this.s_query.slice(0, pos) + ' ' + col_name + ', ' + this.s_query.slice(pos);
    this.s_query = new_query;
  },
});