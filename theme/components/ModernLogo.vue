<script setup lang="ts">
import Logo from '../assets/logo.png'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="modern-logo-container" flex="~" items-center>
    <div mr3 border="~ rounded-full black width-2px" w="57px" h="57px" overflow="hidden">
      <img w="full" h="full" :src="Logo" alt="Logo" class="modern-logo-image">
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
