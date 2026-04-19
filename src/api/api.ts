import axios, { InternalAxiosRequestConfig } from 'axios';
import { getEnvsVariable } from '../helpers';

const {VITE_API_URL} = getEnvsVariable();

export const apiUpTasks =  axios.create({
    baseURL: VITE_API_URL
});


apiUpTasks.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${ token }`;
    }
    return config;
});

