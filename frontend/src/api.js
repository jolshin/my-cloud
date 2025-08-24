import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.url[config.url.length-1] !== '/') {
            config.url += '/';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 

export const shareApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;