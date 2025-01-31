<template>
  <div class="quantity-selector">
    <div class="quantity-controls">
      <button @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button @click="increment">+</button>
    </div>
    <button class="add-button" @click="$emit('add-to-cart')">Adicionar</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const quantity = ref(1);

const emit = defineEmits(['add-to-cart', 'update:modelValue']);

const increment = () => {
  quantity.value += 1;
  emit('update:modelValue', quantity.value);
};

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    emit('update:modelValue', quantity.value);
  }
};

watch(quantity, (newQuantity) => {
  emit('update:modelValue', newQuantity);
});

defineExpose({ quantity });
</script>

<style scoped>
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  padding: 0.25rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
  background-color: #42b883;
  color: white;
  border: none;
}
</style>