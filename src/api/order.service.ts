import api from './api';

interface OrderItem {
    title: string;
    value: number;
}

interface CreateOrderData {
    items: OrderItem[];
    paymentOption: string;
}

export const OrderService = {
    createOrder: (data: CreateOrderData) => api.post('/order/create-order', data),
};