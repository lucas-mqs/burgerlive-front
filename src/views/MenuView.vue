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
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import {computed, onMounted} from 'vue';
import MenuItem from '../components/MenuItem/MenuItem.vue';
import { useCartStore } from '../stores/cart.store.ts';
import type {CartItem} from "../modules/order/domain/models/CartItem.ts";

const menuStore = useMenuStore();
const cartStore = useCartStore();

const menuSections = computed(() => [
  { title: 'Hambúrgueres', icon: '🍔', items: menuStore.hamburgers },
  { title: 'Aperitivos', icon: '🍟', items: menuStore.appetizers },
  { title: 'Sobremesas', icon: '🍰', items: menuStore.desserts },
  { title: 'Bebidas', icon: '🥤', items: menuStore.beverages }
]);

const handleAddToCart = (item: CartItem) => {
  cartStore.addItem(item);
};

onMounted(async () => {
   await menuStore.fetchAll();
})

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

.price {
  display: block;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.menu-image {
  width: 100%;
  max-width: 350px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.swiper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 350px;
  height: 300px;
  overflow: hidden;
}
</style>