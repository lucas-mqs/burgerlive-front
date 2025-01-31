<template>
  <div class="container">
    <NavBar @toggle-cart="toggleCart" />
    <MenuView v-if="!showCheckout" />
    <CartSidebar ref="cartSidebarRef" @open-checkout="openCheckout" />
    <CheckoutView v-if="showCheckout" @checkout-complete="handleCheckoutComplete"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import MenuView from './MenuView.vue';
import CartSidebar from '../components/CartSidebar.vue';
import CheckoutView from './CheckoutView.vue';

const cartSidebarRef = ref<typeof CartSidebar>();
const showCheckout = ref(false);

const toggleCart = () => {
  cartSidebarRef.value?.toggleCart();
};

const openCheckout = () => {
  showCheckout.value = true;
};

const handleCheckoutComplete = () => {
  showCheckout.value = false;
};
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
}
</style>