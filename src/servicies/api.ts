import axios from "axios";

const API_URL='https://api.openweathermap.org'
const API_KEY='35dd2cef05c71d650e2efab42b461864'

const api = axios.create({
    baseURL:API_URL,
    timeout:1000,
    headers:{
        "Content-Type":'application/json'
    },
    params:{
        appid:API_KEY
    }
})

export default api