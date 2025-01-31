<template>
  <div class="container">
    <NavBar @toggle-cart="toggleCart"/>
    <MenuView />
    <CartSidebar ref="cartSidebarRef" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import MenuView from './MenuView.vue';
import CartSidebar from '../components/CartSidebar.vue';

const cartSidebarRef = ref<typeof CartSidebar>();

const toggleCart = () => {
  cartSidebarRef.value?.toggleCart();
};

</script>

<style scoped>
.container {
  position: relative;
}
</style>