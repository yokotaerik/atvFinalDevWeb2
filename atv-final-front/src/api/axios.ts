import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

export default api;