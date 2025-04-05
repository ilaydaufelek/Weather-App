import axios from "axios";

const API_URL='https://api.openweathermap.org'
const API_KEY=import.meta.env.VITE_APP_API_KEY

const api = axios.create({
    baseURL:API_URL,
    timeout:1000,
    headers:{
        "Content-Type":'application/json'
    },
    params:{
        appid:API_KEY,
       units:'metric'
    }
})

export default api