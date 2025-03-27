<script lang="ts" setup>
import type { AnimationSequence } from 'motion'
import { animate, spring } from 'motion'
import { useAppStore } from 'valaxy'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'

const marker = ref()
const mobileMenuOpen = ref(false)

const appStore = useAppStore()
const themeConfig = useThemeConfig()
const { locale } = useI18n()
const route = useRoute()
const navItems = computed(() => themeConfig.value.nav)

const previousActive = ref<HTMLElement>()
const currentActive = ref<HTMLElement>()

function updateMarker() {
  const newActive = document.querySelector('.modern-nav .router-link-active') as HTMLElement
  if (!newActive || !marker.value)
    return

  previousActive.value = currentActive.value
  currentActive.value = newActive

  // If no previous active (initial load), just position the marker
  if (!previousActive.value) {
    animate(marker.value, {
      top: `${currentActive.value.offsetTop}px`,
      height: `${currentActive.value.offsetHeight}px`,
    }, {
      duration: 0.3,
    })
    return
  }

  // Calculate direction (1 for down, -1 for up)
  const direction = currentActive.value.offsetTop > previousActive.value.offsetTop ? 1 : -1

  // Animation sequence
  const sequence: AnimationSequence = [
    // Start from previous position
    [marker.value, {
      top: `${previousActive.value.offsetTop}px`,
      height: `${previousActive.value.offsetHeight}px`,
    }],
    // Expand in the direction of movement
    [marker.value, {
      top: `${direction > 0 ? previousActive.value.offsetTop : currentActive.value.offsetTop}px`,
      height: `${Math.abs(currentActive.value.offsetTop - previousActive.value.offsetTop)
      + (direction > 0 ? currentActive.value.offsetHeight : previousActive.value.offsetHeight)}px`,
    }],
    // Settle to new position
    [marker.value, {
      top: `${currentActive.value.offsetTop}px`,
      height: `${currentActive.value.offsetHeight}px`,
    }, {
      type: spring,
      bounce: 0.15,
      stiffness: 70,
      damping: 8,
      duration: 0.25,
    }],
  ]

  animate(sequence)
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  nextTick(updateMarker)
})

watch(() => locale.value, () => setTimeout(() => updateMarker(), 0))
onMounted(() => nextTick(updateMarker))
</script>

<template>
  <div flex="~ col" w="56px" h="full" class="modern-nav fixed left-0 top-0 z-50 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-dark">
    <ModernMobileMenuTrigger @click="toggleMobileMenu" />

    <div flex="~ col" justify-center h="full" class="desktop-nav-items">
      <div v-for="(item, idx) in navItems" :key="idx" flex="~ col">
        <AppLink :to="item.link" class="modern-nav-item m-4 flex justify-center" :aria-label="item.text">
          <div :class="item.icon" text-xl />
        </AppLink>
      </div>
      <div ref="marker" class="modern-nav-marker bg-primary absolute right-0 w-2px" />
    </div>

    <button
      class="dark-mode-toggle mb-4 mt-auto flex justify-center p-4 md:mb-4"
      aria-label="Toggle Dark Mode"
      @click="appStore.toggleDarkWithTransition"
    >
      <div v-if="!appStore.isDark" i-ri-sun-line text-xl />
      <div v-else i-ri-moon-line text-xl />
    </button>

    <ModernMobileNav
      :is-open="mobileMenuOpen"
      :nav-items="navItems"
      @close="closeMobileMenu"
    />
  </div>
</template>

<style lang="scss" scoped>
.modern-nav-item {
  color: #000;

  @at-root html.dark & {
    color: #fff;
  }
}

.modern-nav-marker {
  position: absolute;
  border-right: 2px solid #000;
  pointer-events: none;

  @at-root html.dark & {
    border-right-color: #fff;
  }
}

@media (max-width: 768px) {
  .modern-nav {
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    position: fixed;
    top: 0;
    bottom: auto;
    z-index: 50;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

    .desktop-nav-items,
    .dark-mode-toggle {
      display: none;
    }
  }
}
</style>
