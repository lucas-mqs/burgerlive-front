<template>
    <div class="cart-sidebar" :class="{ open: isOpen }">
        <div class="cart-header">
            <h2>Carrinho de Compras</h2>
            <button @click="toggleCart">Fechar</button>
        </div>
        <div v-if="cartStore.items.length === 0" class="empty-cart">
            <p>Seu carrinho está vazio</p>
        </div>
        <div v-else>
            <div class="cart-items">
                <div v-for="item in cartStore.items" :key="item.id + (item.options?.type || '')" class="cart-item">
                    <h3>{{ item.name }}</h3>
                    <p v-if="item.options?.type">Tipo: {{ item.options.type === 'single' ? 'Simples' : 'Combo' }}</p>
                    <div class="quantity-controls">
                        <button @click="decrementQuantity(item)">-</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="incrementQuantity(item)">+</button>
                    </div>
                    <p>Preço unitário: R$ {{ item.price.toFixed(2) }}</p>
                    <p>Total: R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
                    <button @click="removeFromCart(item.id)">Remover</button>
                </div>
            </div>
            <div class="cart-summary">
                <h2>Total: R$ {{ cartStore.totalPrice.toFixed(2) }}</h2>
                <button class="checkout-button" @click="handlePayment">Finalizar Pedido</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart.store';
import { useRouter } from 'vue-router';
import type { CartItem } from '../modules/order/domain/models/CartItem';

const cartStore = useCartStore();
const isOpen = ref(false);
const router = useRouter();

const toggleCart = () => {
    isOpen.value = !isOpen.value;
};

const removeFromCart = (itemId: string) => {
    cartStore.removeItem(itemId);
};

const incrementQuantity = (item: CartItem) => {
    cartStore.addItem({ ...item, quantity: 1 });
};

const decrementQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
        cartStore.addItem({ ...item, quantity: -1 });
    } else {
        removeFromCart(item.id);
    }
};

const handlePayment = () => {
    router.push('/checkout');
};

defineExpose({ toggleCart });
</script>

<style scoped>
.cart-sidebar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s ease;
    z-index: 1000;
    padding: 1rem;
}

.cart-sidebar.open {
    right: 0;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.cart-items {
    max-height: 70%;
    overflow-y: auto;
}

.cart-item {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cart-summary {
    margin-top: 2rem;
    text-align: right;
}

.checkout-button {
    padding: 10px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
}

.checkout-button:hover {
    background-color: #36a372;
}

.empty-cart {
    text-align: center;
}

button {
    padding: 0.5rem 1rem;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #cc0000;
}
</style>