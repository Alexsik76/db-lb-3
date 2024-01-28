import { reactive } from "vue";
import { createFetch } from "@vueuse/core";

export const useMyFetch = createFetch({
  baseUrl: "https://db-api.zpi-zp31.vn.ua/api/",
  // combination: 'overwrite',
});

export const sql_query = reactive({
  s_query: "",
  append(col_name) {
    this.s_query += " " + col_name;
  },
});

export const all_queries = {
  "Всі машини": "SELECT * FROM car",
  "Всі продажі": "SELECT * FROM marketing",
  "Всі продажі з маркою":
'SELECT marketing.id, DATE_FORMAT(marketing.date_of_sale, "%d.%m.%Y") AS "date sale", marketing.quantity,\
\ncar.brand FROM marketing\nJOIN car ON marketing.car_id = car.id;',
"Продажі з маркокю машини, ціною та сумою":
    "SELECT marketing.id, \nDATE_FORMAT(marketing.date_of_sale, '%d.%m.%Y')\
AS date_sale, \nmarketing.quantity, \ncar.brand, \nCONCAT(car.price, ' ₴') AS price, \nCONCAT(car.price*quantity, ' ₴') AS summ \
\nFROM marketing \nJOIN car ON marketing.car_id = car.id;",
};
