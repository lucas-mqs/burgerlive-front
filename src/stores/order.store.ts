import { defineStore } from 'pinia';
import { OrderService } from '../api/order.service';
import type { CreateOrderData } from '../api/order.service';
import type { CartItem } from '../modules/order/domain/models/CartItem';

interface OrderState {
    orderId: string | null;
    loading: boolean;
    error: string | null;
    selectedItems: CartItem[];
    paymentOption: string;
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        selectedItems: [],
        error: null,
        loading: false,
        orderId: null,
        paymentOption: ''
    }),

    actions: {
        async createOrder() {
            this.loading = true;
            this.error = null;

            try {
                const orderData: CreateOrderData = {
                    items: this.selectedItems,
                    paymentOption: this.paymentOption || ''
                };

                const response = await OrderService.createOrder(orderData);
                this.orderId = response.data.orderId;
                this.clearCart();
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Erro ao finalizar pedido';
            } finally {
                this.loading = false;
            }
        },

        addItemToCart(item: CartItem) {
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
        totalAmount: (state) => state.selectedItems.reduce((total: number, item: CartItem) => total + item.price, 0),
    }
});
