<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed, onMounted, ref } from 'vue'

const siteConfig = useSiteConfig()
const social = computed(() => siteConfig.value.social)

const isLoaded = ref(false)

const hoveredIcon = ref('')

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 0)
})
</script>

<template>
  <div
    class="modern-about"
    h="100vh"
    flex="~ col"
    items-center
    justify-center
  >
    <div
      class="modern-about-content"
      :class="{ 'modern-about-loaded': isLoaded }"
      max-w="md:25vw"
    >
      <ModernLogo
        title="SHOMPINICE"
        class="modern-safe-padding modern-about-logo"
        :class="{ 'modern-about-loaded': isLoaded }"
      />

      <div
        class="modern-about-body"
        :class="{ 'modern-about-loaded': isLoaded }"
      >
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-content-after>
              <div
                class="modern-about-social"
                :class="{ 'modern-about-loaded': isLoaded }"
                flex="~"
                items-center
                justify-between
                mt="8"
              >
                <AppLink
                  v-for="item in social"
                  :key="item.name"
                  :to="item.link"
                  :title="item.name"
                  class="modern-about-social-link"
                  @mouseenter="hoveredIcon = item.name"
                  @mouseleave="hoveredIcon = ''"
                >
                  <div
                    :class="[item.icon, { 'modern-about-social-active': hoveredIcon === item.name }]"
                    h="22.28px"
                    w="22.28px"
                    color="dark dark:white"
                  />
                </AppLink>
              </div>
            </template>
          </component>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modern-about {
  position: relative;
  overflow: hidden;

  &-content {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    &.modern-about-loaded {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-logo {
    opacity: 0;
    transform: scale(0.95);
    transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;

    &.modern-about-loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  &-body {
    opacity: 0;
    transform: translateY(10px);
    transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;

    &.modern-about-loaded {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-social {
    opacity: 0;
    transform: translateY(10px);
    transition: all 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.5s;

    &.modern-about-loaded {
      opacity: 1;
      transform: translateY(0);
    }

    &-link {
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);

      &:hover {
        transform: translateY(-3px);
      }
    }

    &-active {
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      transform: scale(1.2);
      filter: brightness(1.2);
    }
  }
}
</style>
