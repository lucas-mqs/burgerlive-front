<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Cardápio</router-link>
    <router-link to="/checkout" class="nav-link">
      Carrinho ({{ cartStore.items.length }})
    </router-link>
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
</style>