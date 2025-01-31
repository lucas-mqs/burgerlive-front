<template>
  <div class="options">
    <template v-if="hasOptions">
      <template v-for="key in optionOrder" :key="key">
        <label v-if="item.values?.[key] !== null && item.values?.[key] !== undefined" class="option-label">
          <input type="radio" :name="`option-${item.id}`" :value="item.values[key]" v-model="selectedOption" />
          <span class="price">{{ optionLabels[key] }} - R$ {{ item.values[key] }}</span>
        </label>
      </template>
    </template>

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
    value?: number | null;
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

const hasOptions = computed(() => {
  return !!props.item.values && Object.keys(props.item.values).length > 0;
});
</script>

<style scoped>
.options {
  display: flex;
  gap: 0.5rem;
}

.option-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  white-space: nowrap;
}

.description {
  flex: 1;
  text-align: justify;
}

.price {
  font-weight: bold;
  color: #2c3e50;
}

.fixed-price {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}
</style>