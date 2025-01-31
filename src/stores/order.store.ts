import { defineStore } from 'pinia';
import { OrderService } from '../api/order.service';
import type { CreateOrderData, OrderItem } from '../api/order.service';
import type {CartItem} from "../modules/order/domain/models/CartItem.ts";

interface OrderState {
    orderId: string | null;
    loading: boolean;
    error: string | null;
    selectedItems: OrderItem[];
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        orderId: null,
        loading: false,
        error: null,
        selectedItems: []
    }),

    actions: {
        async createOrder(paymentOption: string) {
            this.loading = true;
            this.error = null;

            try {
                const orderData: CreateOrderData = {
                    items: this.selectedItems,
                    paymentOption
                };

                const response = await OrderService.createOrder(orderData);
                this.orderId = response.orderId; // Ajustado para pegar `orderId` do response
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
        totalAmount: (state) => {
            return state.selectedItems.reduce((sum, item) => sum + item.value, 0);
        }
    }
});
