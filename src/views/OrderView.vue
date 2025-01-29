<template>
  <div class="container">
    <NavBar />
    <h1>Finalizar Pedido</h1>

    <div v-if="orderStore.error" class="error-message">
      {{ orderStore.error }}
    </div>

    <form @submit.prevent="submitOrder" class="order-form">
      <div class="form-section">
        <h2>Itens do Pedido</h2>
        <div v-if="orderStore.selectedItems.length === 0" class="empty-cart">
          Nenhum item selecionado
        </div>
        <div v-else class="cart-items">
          <div v-for="(item, index) in orderStore.selectedItems" :key="index" class="cart-item">
            <div class="item-info">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-price">R$ {{ item.value.toFixed(2) }}</span>
            </div>
            <button type="button" @click="orderStore.removeItemFromCart(index)" class="remove-btn">
              ×
            </button>
          </div>
        </div>
        <div class="total-price">
          Total: R$ {{ orderStore.totalAmount.toFixed(2) }}
        </div>
      </div>

      <div class="form-section">
        <h2>Forma de Pagamento</h2>
        <select v-model="selectedPayment" required class="payment-select">
          <option value="">Selecione uma opção</option>
          <option
              v-for="option in menuStore.paymentOptions"
              :key="option"
              :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <button
          type="submit"
          class="submit-btn"
          :disabled="orderStore.loading || orderStore.selectedItems.length === 0"
      >
        {{ orderStore.loading ? 'Processando...' : 'Confirmar Pedido' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import { useOrderStore } from '../stores/order.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const orderStore = useOrderStore();
const router = useRouter();
const selectedPayment = ref('');

const submitOrder = async () => {
  if (!selectedPayment.value) return;

  await orderStore.createOrder(selectedPayment.value);

  if (orderStore.orderId) {
    router.push(`/order-confirmation/${orderStore.orderId}`);
  }
};
</script>

<style scoped>
.order-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-items {
  margin: 1rem 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex-grow: 1;
}

.item-title {
  font-weight: 500;
}

.item-price {
  margin-left: 1rem;
  color: #42b883;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
  margin-top: 1rem;
  color: #2c3e50;
}

.payment-select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1rem;
}

.error-message {
  color: #ff4444;
  background: #ffeaea;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>