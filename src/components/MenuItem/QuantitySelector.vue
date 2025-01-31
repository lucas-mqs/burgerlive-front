<template>
  <div class="quantity-selector">
    <button @click="decrement">-</button>
    <span>{{ quantity }}</span>
    <button @click="increment">+</button>
    <button class="add-button" @click="$emit('add-to-cart')">Adicionar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const quantity = ref(1);

const emit = defineEmits(['add-to-cart']);

const increment = () => {
  quantity.value += 1;
};

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

defineExpose({ quantity });
</script>

<style scoped>
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
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