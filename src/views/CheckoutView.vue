<template>
  <div class="checkout-container">
    <NavBar />
    <h1>Resumo do Pedido</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Seu carrinho está vazio</p>
      <router-link to="/">Voltar ao cardápio</router-link>
    </div>

    <div v-else>
      <div class="order-items">
        <div v-for="item in cartStore.items" :key="item.id + (item.options?.type || '')" class="order-item">
          <h3>{{ item.name }}</h3>
          <p v-if="item.options?.type">Tipo: {{ item.options.type === 'single' ? 'Simples' : 'Combo' }}</p>
          <p>Quantidade: {{ item.quantity }}</p>
          <p>Preço unitário: R$ {{ item.price.toFixed(2) }}</p>
          <p>Total: R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </div>

      <div class="payment-section">
        <h2>Total do Pedido: R$ {{ cartStore.totalPrice.toFixed(2) }}</h2>

        <div class="payment-methods">
          <div
            v-for="method in paymentMethods"
            :key="method"
            class="payment-method"
          >
            <input
              type="radio"
              :id="method"
              :value="method"
              v-model="selectedPaymentMethod"
            />
            <label :for="method">{{ method }}</label>
          </div>
        </div>

        <button
          class="pay-button"
          @click="handlePayment"
          :disabled="!selectedPaymentMethod"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.store';
import { ref } from 'vue';
import { PaymentMethod } from '../modules/order/domain/models/PaymentMethod';
import { PaymentService } from '../modules/order/infrastructure/services/PaymentService';

const cartStore = useCartStore();
const selectedPaymentMethod = ref<PaymentMethod | null>(null);
const paymentService = new PaymentService();

const paymentMethods = Object.values(PaymentMethod);
const emit = defineEmits(['checkout-complete']);

const handlePayment = async () => {
  if (!selectedPaymentMethod.value) return;

  try {
    const success = await paymentService.processPayment();

    if (success) {
      alert('Pagamento realizado com sucesso!');
      cartStore.clearCart();
      emit('checkout-complete');
    }
  } catch (error) {
    alert('Erro no pagamento: ' + error);
  }
};
</script>

<style scoped>
.checkout-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.order-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.payment-section {
  text-align: center;
}

.payment-methods {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pay-button {
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
}

.pay-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>