<script lang="ts" setup>
import { useRoute } from 'vue-router'

defineProps<{
  isOpen: boolean
  navItems: any[]
}>()

defineEmits<{
  close: []
}>()

const route = useRoute()
</script>

<template>
  <div
    v-if="isOpen"
    class="modern-mobile-nav-overlay fixed inset-0 z-100 bg-white bg-opacity-95 dark:bg-dark dark:bg-opacity-95"
  >
    <div class="modern-mobile-nav-content h-full w-full flex flex-col">
      <div class="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
        <div class="text-lg text-gray-400 font-medium">
          {{ route.name || '导航菜单' }}
        </div>
        <button class="p-2" @click="$emit('close')">
          <div i-ri-close-line text-2xl />
        </button>
      </div>

      <div class="modern-mobile-nav-items flex flex-col p-4">
        <template v-for="item in navItems" :key="item.path">
          <AppLink
            :to="item.link"
            class="modern-mobile-nav-item flex items-center border-b border-gray-100 py-4 dark:border-gray-800"
            @click="$emit('close')"
          >
            <div class="w-12 flex justify-center">
              <div :class="item.icon" text-xl />
            </div>
            <span class="ml-4">{{ item.text }}</span>
          </AppLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modern-mobile-nav-overlay {
  transition: opacity 0.3s ease;
}

.modern-mobile-nav-content {
  animation: slideIn 0.3s ease;
  overflow-y: auto;
}

.modern-mobile-nav-item {
  color: #333;
  transition: background-color 0.2s ease;
  font-size: 1rem;

  .dark & {
    color: #eee;
  }

  &:hover,
  &.router-link-active {
    background-color: rgba(0, 0, 0, 0.05);

    .dark & {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
