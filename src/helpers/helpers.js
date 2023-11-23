const base_api_url = import.meta.env.VITE_BASE_API_URL
export function get_url(url_part){
  return `${base_api_url}${url_part}`
}