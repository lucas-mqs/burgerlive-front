<template>
  <div class="menu-item">
    <h3>{{ item.title }}</h3>

    <ItemImages :images="item.image" />

    <p>{{ item.description }}</p>

    <ItemOptions
        v-if="item.values"
        :item="item"
        v-model="selectedOption"
    />

    <QuantitySelector
        v-model="quantity"
        @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CartItem } from '../modules/order/domain/models/CartItem.ts';
import ItemImages from '../MenuItem/ItemImages.vue';
import ItemOptions from '../MenuItem/ItemOptions.vue';
import QuantitySelector from '../MenuItem/QuantitySelector.vue';

const props = defineProps<{
  item: {
    id: string;
    title: string;
    description: string;
    image: string[];
    values?: { single: number; combo: number };
    value?: number;
  };
}>();

const emit = defineEmits(['add-to-cart']);

const quantity = ref(1);
const selectedOption = ref<number | null>(null);

const handleAddToCart = () => {
  const cartItem: CartItem = {
    id: props.item.id,
    name: props.item.title,
    price: selectedOption.value || props.item.value || 0,
    quantity: quantity.value,
    options: props.item.values ? {
      type: selectedOption.value === props.item.values.single ? 'single' : 'combo'
    } : undefined
  };

  emit('add-to-cart', cartItem);
};
</script>