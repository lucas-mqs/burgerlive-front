<template>
  <div class="options">
    <!-- Opções de escolha -->
    <template v-if="hasOptions">
      <template v-for="key in optionOrder" :key="key">
        <label v-if="item.values?.[key] !== null && item.values?.[key] !== undefined">
          <input
              type="radio"
              :name="`option-${item.id}`"
              :value="item.values[key]"
              v-model="selectedOption"
          />
          {{ optionLabels[key] }} - R$ {{ item.values[key] }}
        </label>
      </template>
    </template>

    <!-- Valor fixo (se existir) -->
    <template v-else-if="item.value !== undefined && item.value !== null">
      <p class="fixed-price">R$ {{ item.value }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  item: {
    id: string;
    value?: number | null; // Pode ser null ou undefined
    values?: Record<string, number | null>;
  };
}>();

const selectedOption = defineModel<number | null>();

const optionOrder = ['small', 'large', 'single', 'combo'];
const optionLabels: Record<string, string> = {
  small: 'Pequeno',
  large: 'Grande',
  single: 'Simples',
  combo: 'Combo'
};

// Verifica se tem opções de escolha
const hasOptions = computed(() => {
  return !!props.item.values && Object.keys(props.item.values).length > 0;
});
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fixed-price {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}
</style>