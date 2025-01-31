import { defineStore } from 'pinia';
import type { CartItem } from '../modules/order/domain/models/CartItem';
import type {PaymentMethod} from "../modules/order/domain/models/PaymentMethod.ts";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        paymentMethod: null as PaymentMethod | null
    }),
    actions: {
        addItem(item: CartItem) {
            const existing = this.items.find(i => i.id === item.id && i.options?.type === item.options?.type);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                this.items.push({ ...item });
            }
        },
        removeItem(itemId: string) {
            this.items = this.items.filter(i => i.id !== itemId);
        },
        clearCart() {
            this.items = [];
            this.paymentMethod = null;
        }
    },
    getters: {
        totalPrice: (state) => {
            return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        }
    }
});