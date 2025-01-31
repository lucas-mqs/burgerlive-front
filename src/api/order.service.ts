import api from './api';
import { useAuthStore } from '../stores/auth.store';

export interface OrderItem {
    title: string;
    value: number;
}

export interface CreateOrderData {
    items: OrderItem[];
    paymentOption: string;
}

export const OrderService = {
    createOrder: async (data: CreateOrderData) => {
        try {
            const authStore = useAuthStore();
            if (!authStore.token) {
                throw new Error('Usuário não autenticado.');
            }

            const response = await api.post('/order/create-order', data, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw new Error('Falha ao criar o pedido.');
        }
    },
};
