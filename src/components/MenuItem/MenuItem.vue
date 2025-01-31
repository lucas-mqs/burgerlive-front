<template>
  <div class="menu-item">
    <h3>{{ item.title }}</h3>

    <div v-if="Array.isArray(item.image)" class="swiper">
      <div class="swiper-wrapper">
        <div v-for="(image, index) in item.image" :key="index" class="swiper-slide">
          <ItemImages :images="image" :alt="`${item.description} - imagem ${index + 1}`" class="menu-image" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div v-else>
      <ItemImages :images="item.image" />
    </div>

    <p>{{ item.description }}</p>

    <ItemOptions :item="item" v-model="selectedOption" />
    <QuantitySelector v-model="quantity" @add-to-cart="handleAddToCart" />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CartItem } from '../../modules/order/domain/models/CartItem';
import ItemOptions from '../MenuItem/ItemOptions.vue';
import QuantitySelector from '../MenuItem/QuantitySelector.vue';
import ItemImages from './ItemImages.vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const props = defineProps<{
  item: {
    id: string;
    title: string;
    description: string;
    image: string | string[];
    values?: Record<string, number | null>;
    value?: number;
  };
}>();

const emit = defineEmits(['add-to-cart']);

const quantity = ref(1);
const selectedOption = ref<number | null>(null);

const handleAddToCart = () => {
  const price = selectedOption.value ?? props.item.value ?? 0;

  const cartItem: CartItem = {
    id: props.item.id,
    name: props.item.title,
    price: price,
    quantity: quantity.value,
    options: props.item.values ? {
      type: selectedOption.value ? getOptionType(selectedOption.value) : undefined
    } : undefined
  };

  emit('add-to-cart', cartItem);
};

const getOptionType = (value: number): 'single' | 'combo' | undefined => {
  if (!props.item.values) return undefined;

  return Object.entries(props.item.values).find(
    ([_, val]) => val === value
  )?.[0] as 'single' | 'combo' | undefined;
};

onMounted(() => {
  if (Array.isArray(props.item.image)) {
    new Swiper('.swiper', {
      loop: props.item.image.length > 1,
      autoplay: props.item.image.length > 1 ? { delay: 3000 } : false,
      pagination: props.item.image.length > 1 ? {
        el: '.swiper-pagination',
        clickable: true,
      } : false,
      navigation: props.item.image.length > 1 ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false,
    });
  }
});
</script>

<!-- <style scoped>
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

.swiper {
  width: 100%;
  max-width: 350px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination {
  position: relative;
  margin-top: 1rem;
}

.swiper-button-next,
.swiper-button-prev {
  color: #42b883;
  --swiper-navigation-size: 24px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-weight: bold;
}
</style> -->