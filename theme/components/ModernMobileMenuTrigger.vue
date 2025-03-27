<script lang="ts" setup>
defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="modern-mobile-menu-trigger" @click="$emit('click')">
    <div i-ri-menu-line text-xl />
  </div>
</template>

<style lang="scss" scoped>
.modern-mobile-menu-trigger {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: flex;
  }
}
</style>
