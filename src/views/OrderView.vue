<template>
  <div class="container">
    <NavBar />
    <h1>Cardápio</h1>

    <div v-if="menuStore.loading" class="loading">Carregando...</div>

    <section v-else>
      <section class="menu-section" v-for="section in menuSections" :key="section.title">
        <h2>{{ section.icon }} {{ section.title }}</h2>
        <div class="grid">
          <MenuItem
              v-for="item in section.items"
              :key="item.id"
              :item="item"
              @add-to-cart="handleAddToCart"
          />
        </div>
      </section>

      <button @click="finalizarPedido" :disabled="orderStore.selectedItems.length === 0">
        Finalizar Pedido
      </button>

      <p v-if="orderStore.error" class="error">{{ orderStore.error }}</p>
      <p v-if="orderStore.orderId" class="success">Pedido realizado com sucesso! ID: {{ orderStore.orderId }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import { useOrderStore } from '../stores/order.store';
import { computed, ref } from 'vue';
import MenuItem from '../components/MenuItem/MenuItem.vue';
import type { CartItem } from '../modules/order/domain/models/CartItem.ts';

const menuStore = useMenuStore();
const orderStore = useOrderStore();
const paymentOption = ref('Cartão de Crédito'); // Definição inicial

const menuSections = computed(() => [
  { title: 'Hambúrgueres', icon: '🍔', items: menuStore.hamburgers },
  { title: 'Aperitivos', icon: '🍟', items: menuStore.appetizers },
  { title: 'Sobremesas', icon: '🍰', items: menuStore.desserts },
  { title: 'Bebidas', icon: '🥤', items: menuStore.beverages }
]);

const handleAddToCart = (item: CartItem) => {
  orderStore.addItemToCart(item);
};

const finalizarPedido = async () => {
  await orderStore.createOrder(paymentOption.value);
};
</script>

<style>
.container {
  text-align: center;
}

button {
  padding: 10px;
  margin-top: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
