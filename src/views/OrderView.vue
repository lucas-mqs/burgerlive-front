<template>
  <div class="container">
    <NavBar />
    <h1>Cardápio</h1>

    <!-- Loading state mantido -->
    <div v-if="menuStore.loading" class="loading">Carregando...</div>

    <section v-else>
      <!-- Seção de Hambúrgueres (exemplo) -->
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import { computed } from 'vue';
import MenuItem from '../components/MenuItem/MenuItem.vue';
import type {CartItem} from "../modules/order/domain/models/CartItem.ts";

const menuStore = useMenuStore();
const menuSections = computed(() => [
  { title: 'Hambúrgueres', icon: '🍔', items: menuStore.hamburgers },
  { title: 'Aperitivos', icon: '🍟', items: menuStore.appetizers },
  { title: 'Sobremesas', icon: '🍰', items: menuStore.desserts },
  { title: 'Bebidas', icon: '🥤', items: menuStore.beverages }
]);
// @ts-ignore
const handleAddToCart = (item: CartItem) => {
};
</script>