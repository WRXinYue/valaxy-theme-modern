<script setup lang="ts">
import { useMouseInElement, useWindowSize } from '@vueuse/core'
import { useSiteConfig } from 'valaxy'
import { computed, onMounted, ref } from 'vue'
import { useThemeConfig } from '../composables'

const isLoaded = ref(false)
const containerRef = ref(null)
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { elementX, elementY, isOutside } = useMouseInElement(containerRef)

const mouseTransform = computed(() => {
  // Return no transform if parallax is disabled
  if (!themeConfig.value.hero.parallax || isOutside.value)
    return 'translate(0px, 0px)'

  const centerX = windowWidth.value / 2
  const centerY = windowHeight.value / 2

  const moveX = (elementX.value - centerX) * 0.01
  const moveY = (elementY.value - centerY) * 0.01

  return `translate(${moveX}px, ${moveY}px)`
})

const backgroundTransform = computed(() => {
  // Return no transform if parallax is disabled
  if (!themeConfig.value.hero.parallax || isOutside.value)
    return 'translate(0px, 0px)'

  const centerX = windowWidth.value / 2
  const centerY = windowHeight.value / 2

  // Make background move in opposite direction with gentler effect
  const moveX = (centerX - elementX.value) * 0.015
  const moveY = (centerY - elementY.value) * 0.015

  return `translate(${moveX}px, ${moveY}px)`
})

const logoSrc = computed(() => {
  return themeConfig.value.logo || siteConfig.value.author.avatar
})

const title = computed(() => {
  return themeConfig.value.hero.title || siteConfig.value.author.name
})

const description = computed(() => {
  return themeConfig.value.hero.description || siteConfig.value.description
})

const backgroundImage = computed(() => themeConfig.value.hero?.image)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 0)
})
</script>

<template>
  <div
    ref="containerRef"
    class="modern-hero"
    h="100vh"
    w="full"
    flex="~ col"
    items-center
    justify-center
  >
    <div
      class="modern-hero-background"
      :class="{ 'modern-hero-loaded': isLoaded }"
      :style="{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        transform: backgroundTransform,
      }"
    />
    <div
      class="modern-hero-content"
      :class="{ 'modern-hero-loaded': isLoaded }"
      :style="{ transform: mouseTransform }"
    >
      <ModernLogo :title class="modern-hero-logo" :class="{ 'modern-hero-loaded': isLoaded }" :src="logoSrc" />
      <p class="modern-hero-tagline" :class="{ 'modern-hero-loaded': isLoaded }">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modern-hero {
  position: relative;
  overflow: hidden;

  &-background {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    opacity: 0;
    transition: opacity 1.5s cubic-bezier(0.23, 1, 0.32, 1);
    background-size: cover;
    background-position: center;
    will-change: transform;
    transition:
      opacity 1.5s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.5s ease-out;

    &.modern-hero-loaded {
      opacity: 1;
    }
  }

  &-content {
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform;

    &.modern-hero-loaded {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-logo {
    opacity: 0;
    transform: scale(0.95);
    transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;

    &.modern-hero-loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  &-tagline {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: #333;
    opacity: 0;
    transform: translateY(10px);
    transition: all 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.5s;

    &.modern-hero-loaded {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
