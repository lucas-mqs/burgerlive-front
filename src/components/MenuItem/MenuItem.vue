<template>
  <div class="menu-item">
    <h3>{{ item.title }}</h3>

    <ItemImages :images="item.image" />

    <p>{{ item.description }}</p>

    <!-- Remova a condicional v-if="item.values" -->
    <ItemOptions
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
import type { CartItem } from '../../modules/order/domain/models/CartItem';
import ItemImages from '../MenuItem/ItemImages.vue';
import ItemOptions from '../MenuItem/ItemOptions.vue';
import QuantitySelector from '../MenuItem/QuantitySelector.vue';

const props = defineProps<{
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    values?: Record<string, number | null>; // Alterado para estrutura genérica
    value?: number;
  };
}>();

const emit = defineEmits(['add-to-cart']);

const quantity = ref(1);
const selectedOption = ref<number | null>(null);

const handleAddToCart = () => {
  // Calcula o preço corretamente para ambos os casos
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

// Helper para identificar o tipo da opção selecionada
const getOptionType = (value: number): 'single' | 'combo' | undefined => {
  if (!props.item.values) return undefined;

  return Object.entries(props.item.values).find(
      ([_, val]) => val === value
  )?.[0] as 'single' | 'combo' | undefined;
};
</script>