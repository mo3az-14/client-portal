import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "development" ? "/api" : import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
})

export default axiosInstance
