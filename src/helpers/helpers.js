import { reactive } from "vue";

// const base_api_url = import.meta.env.VITE_BASE_API_URL;
const base_api_url = "https:/db-api.zpi-zp31.vn.ua/api/"
export function get_url(url_part) {
  return `${base_api_url}${url_part}`;
}

export const sql_query = reactive({
  s_query: "",
  append(col_name) {
    this.s_query += " " + col_name;
  },
});

export const all_queries = {
  'Всі машини': 'select * from car',
  'Всі продажі': 'select * from marketing',
  'Продажі з маркокю машини, ціною та сумою': "SELECT marketing.id, DATE_FORMAT(marketing.date_of_sale, '%H:%i, %d %M %Y') \
  AS date_sale, marketing.quantity, car.brand, CONCAT(car.price, ' ₴') as price,  CONCAT(car.price*quantity, ' ₴') as summ \
  FROM marketing JOIN car ON marketing.car_id = car.id;"
}
