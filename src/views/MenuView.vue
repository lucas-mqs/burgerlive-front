<template>
  <div class="container">
    <NavBar />
    <h1>Cardápio</h1>

    <div v-if="menuStore.loading" class="loading">Carregando...</div>

    <section v-else>
      <!-- Seções dinâmicas -->
      <section
          class="menu-section"
          v-for="section in menuSections"
          :key="section.title"
      >
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

      <!-- Botão para testar a criação de pedido -->
      <div class="test-container">
        <button @click="testarPedido" class="test-button">Criar Pedido de Teste</button>
        <p v-if="loading">Enviando pedido...</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">Pedido criado! ID: {{ successMessage }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import { useCartStore } from '../stores/cart.store.ts';
import { OrderService } from '../api/order.service';
import { ref, computed, onMounted } from 'vue';
import MenuItem from '../components/MenuItem/MenuItem.vue';
import type { CartItem } from "../modules/order/domain/models/CartItem.ts";

const menuStore = useMenuStore();
const cartStore = useCartStore();
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const menuSections = computed(() => [
  { title: 'Hambúrgueres', icon: '🍔', items: menuStore.hamburgers },
  { title: 'Aperitivos', icon: '🍟', items: menuStore.appetizers },
  { title: 'Sobremesas', icon: '🍰', items: menuStore.desserts },
  { title: 'Bebidas', icon: '🥤', items: menuStore.beverages }
]);

const handleAddToCart = (item: CartItem) => {
  cartStore.addItem(item);
};

const testarPedido = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // Mock de pedido com produtos do menu
    const pedidoTeste = {
      items: [
        { title: 'Hambúrguer Teste', value: 25.99 },
        { title: 'Batata Teste', value: 9.99 }
      ],
      paymentOption: 'Cartão de Crédito'
    };

    const response = await OrderService.createOrder(pedidoTeste);
    successMessage.value = response.orderId;
  } catch (error) {
    errorMessage.value = 'Erro ao criar o pedido de teste.';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await menuStore.fetchAll();
});
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.menu-section {
  margin: 3rem 0;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.menu-section h2 {
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.test-container {
  text-align: center;
  margin-top: 20px;
}

.test-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.test-button:hover {
  background-color: #0056b3;
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
