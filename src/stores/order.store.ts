import { defineStore } from 'pinia';
import type { OrderItem } from '../api/order.service';

interface CartItem {
    title: string;
    value: number;
}

interface OrderState {
    orderId: string | null;
    loading: boolean;
    error: string | null;
    selectedItems: OrderItem[];
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        selectedItems: [],
        error: null,
        loading: false,
        orderId: null
    }),

    actions: {
        async createOrder() {
            this.loading = true;
            this.error = null;

            try {
                // const orderData: CreateOrderData = {
                //     items: this.selectedItems,
                //     paymentOption
                // };

                // const response = await OrderService.createOrder(orderData);
                // this.orderId = response.data.orderId;

                await new Promise((resolve) => setTimeout(resolve, 2000));

                this.clearCart();
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Erro ao finalizar pedido';
            } finally {
                this.loading = false;
            }
        },

        addItemToCart(item: OrderItem) {
            this.selectedItems.push(item);
        },

        removeItemFromCart(index: number) {
            this.selectedItems.splice(index, 1);
        },

        clearCart() {
            this.selectedItems = [];
        }
    },

    getters: {
        totalAmount: (state) => state.selectedItems.reduce((total: number, item: CartItem) => total + item.value, 0),
    }
});