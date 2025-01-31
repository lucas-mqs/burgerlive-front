<template>
  <div class="container">
    <NavBar />
    <h1>Cardápio</h1>

    <div v-if="menuStore.loading" class="loading">Carregando...</div>

    <section v-else>
      <!-- Seção de Hambúrgueres -->
      <section class="menu-section">
        <h2>🍔 Hambúrgueres</h2>
        <div class="grid">
          <div v-for="item in menuStore.hamburgers" :key="item.id" class="menu-item">
            <h3>{{ item.title }}</h3>
            <div class="swiper">
              <div class="swiper-wrapper">
                <div v-for="(image, index) in item.image" :key="index" class="swiper-slide">
                  <img :src="image" :alt="`${item.name} - imagem ${index + 1}`" class="menu-image" />
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <p>{{ item.description }}</p>

            <!-- Opções de Compra -->
            <div class="options">
              <label v-if="item.value">
                <input type="radio" :name="`option-${item.id}`" :value="item.values.single"
                  v-model="selectedValues[item.id]" />
                Simples - R$ {{ item.values.single }}
              </label>
              <label v-if="item.value">
                <input type="radio" :name="`option-${item.id}`" :value="item.values.combo"
                  v-model="selectedValues[item.id]" />
                Combo - R$ {{ item.values.combo }}
              </label>
            </div>
            <p>Preço Selecionado: R$ {{ selectedValues[item.id] || 'Escolha uma opção' }}</p>
            <button @click="addToCart(item)" class="add-to-cart-btn">Adicionar ao Carrinho</button>
          </div>
        </div>
      </section>

      <!-- Aperitivos -->
      <section class="menu-section">
        <h2>🍟 Aperitivos</h2>
        <div class="grid">
          <div v-for="item in menuStore.appetizers" :key="item.id" class="menu-item">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.name" class="menu-image" />
            <p>{{ item.description }}</p>
            <span class="price">R$ {{ (item.value || 0).toFixed(2) }}</span>
            <button @click="addToCart(item)" class="add-to-cart-btn">Adicionar ao Carrinho</button>
          </div>
        </div>
      </section>

      <!-- Sobremesas -->
      <section class="menu-section">
        <h2>🍰 Sobremesas</h2>
        <div class="grid">
          <div v-for="item in menuStore.desserts" :key="item.id" class="menu-item">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.name" class="menu-image" />
            <p>{{ item.description }}</p>
            <span class="price">R$ {{ (item.value || 0).toFixed(2) }}</span>
            <button @click="addToCart(item)" class="add-to-cart-btn">Adicionar ao Carrinho</button>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <h2>🥤 Bebidas</h2>
        <div class="grid">
          <div v-for="item in menuStore.beverages" :key="item.id" class="menu-item">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.name" class="menu-image" />
            <p>{{ item.description }}</p>
            <span class="price">R$ {{ (item.value || 0).toFixed(2) }}</span>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '../stores/menu.store';
import { useOrderStore } from '../stores/order.store';
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const menuStore = useMenuStore();
const orderStore = useOrderStore();
const selectedValues = ref<{ [key: string]: number }>({});
const isLoading = ref(false);


onMounted(async () => {
  try {
    isLoading.value = true;
    await menuStore.fetchAll();
  } finally {
    isLoading.value = false;
  }

  new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

const addToCart = (item: { id: string; title: string; values: { single: number; combo: number } }) => {
  const selectedValue = selectedValues.value[item.id];
  if (selectedValue) {
    orderStore.addItemToCart({ id: item.id, name: item.title, price: selectedValue, quantity: 1 });
  } else {
    alert('Por favor, selecione uma opção antes de adicionar ao carrinho.');
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.menu-section {
  margin-bottom: 40px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
}

.menu-item {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: calc(33.333% - 2rem);
}

.menu-image {
  width: 100%;
  height: auto;
}

.add-to-cart-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #36a372;
}

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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