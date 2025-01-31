<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">BURGUERLIVE</router-link>
    <div class="cart-icon" @click="$emit('toggle-cart')">
      🛒 ({{ cartStore.items.length }})
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.store';

const cartStore = useCartStore();
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

.nav-link.router-link-exact-active {
  color: #42b883;
}

.cart-icon {
  cursor: pointer;
  font-size: 1.2rem;
}
</style>