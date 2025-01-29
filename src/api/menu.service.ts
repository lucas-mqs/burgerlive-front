import api from './api';

export const MenuService = {
    getCategories: () => api.get('/categories'),
    getHamburgers: () => api.get('/hamburgers'),
    getAppetizers: () => api.get('/appetizers'),
    getDesserts: () => api.get('/desserts'),
    getBeverages: () => api.get('/beverages'),
    getPaymentOptions: () => api.get('/payment/options'),
};