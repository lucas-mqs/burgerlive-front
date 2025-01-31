<template>
  <div class="options">
    <label>
      <input
          type="radio"
          :name="`option-${item.id}`"
          :value="item.values.single"
          v-model="selectedOption"
      />
      Simples - R$ {{ item.values.single }}
    </label>
    <label>
      <input
          type="radio"
          :name="`option-${item.id}`"
          :value="item.values.combo"
          v-model="selectedOption"
      />
      Combo - R$ {{ item.values.combo }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    id: string;
    values: { single: number; combo: number };
  };
}>();

const selectedOption = defineModel<number>();
</script>