<template>
  <div class="swiper-container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
            v-for="(image, index) in normalizedImages"
            :key="index"
            class="swiper-slide"
        >
          <img
              :src="image"
              :alt="`Imagem ${index + 1}`"
              class="menu-image"
          />
        </div>
      </div>
      <div
          class="swiper-pagination"
          v-if="normalizedImages.length > 1"
      ></div>
      <div
          class="swiper-button-next"
          v-if="normalizedImages.length > 1"
      ></div>
      <div
          class="swiper-button-prev"
          v-if="normalizedImages.length > 1"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const props = defineProps<{
  images: string[] | string;
}>();

const normalizedImages = computed(() => {
  return Array.isArray(props.images)
      ? props.images
      : [props.images];
});

onMounted(() => {
  const hasMultipleImages = normalizedImages.value.length > 1;

  new Swiper('.swiper', {
    loop: hasMultipleImages,
    autoplay: hasMultipleImages ? { delay: 3000 } : false,
    pagination: hasMultipleImages ? {
      el: '.swiper-pagination',
      clickable: true,
    } : false,
    navigation: hasMultipleImages ? {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    } : false,
  });
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.swiper {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>