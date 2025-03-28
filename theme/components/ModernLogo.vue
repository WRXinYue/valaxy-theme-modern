<script setup lang="ts">
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import DarkLogo from '../assets/logo_dark.png'
import LightLogo from '../assets/logo_light.png'

const props = defineProps<{
  title: string
  src?: string | {
    dark?: string
    light?: string
  }
}>()

const appStore = useAppStore()

const logo = computed(() => {
  if (typeof props.src === 'object' && props.src !== null) {
    return appStore.isDark ? props.src.dark || LightLogo : props.src.light || DarkLogo
  }
  return appStore.isDark ? LightLogo : DarkLogo
})
</script>

<template>
  <div class="modern-logo-container" flex="~" items-center>
    <div mr3 border="~ rounded-full black dark:white width-2px" w="57px" h="57px" overflow="hidden">
      <img w="full" h="full" :src="logo" alt="Logo" class="modern-logo-image">
    </div>
    <h1 class="modern-logo-title">
      {{ title }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.modern-logo-title {
  font-family: 'Segoe UI', sans-serif;
  font-size: 21px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0.25em;
}
</style>
