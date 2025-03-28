<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed } from 'vue'

const siteConfig = useSiteConfig()

const social = computed(() => siteConfig.value.social)
</script>

<template>
  <div h="100vh" flex="~ col" items-center justify-center>
    <div max-w="md:25vw">
      <ModernLogo title="SHOMPINICE" px-59px />

      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-content-after>
            <div flex="~" items-center justify-between>
              <AppLink v-for="item in social" :key="item.name" :to="item.link" :title="item.name">
                <div :class="item.icon" h="22.28px" w="22.28px" color="dark dark:white" />
              </AppLink>
            </div>
          </template>
        </component>
      </RouterView>
    </div>
  </div>
</template>
