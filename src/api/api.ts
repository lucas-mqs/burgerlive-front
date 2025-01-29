import axios from 'axios';

const api = axios.create({
    baseURL: 'https://burgerlivery-api.vercel.app/',
});

export default api;