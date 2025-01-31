import axios from 'axios';

const api = axios.create({
    baseURL: 'https://burgerlivery-api.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
