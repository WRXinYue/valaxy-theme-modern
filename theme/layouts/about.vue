<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed } from 'vue'

const siteConfig = useSiteConfig()

const social = computed(() => siteConfig.value.social)
</script>

<template>
  <div h="100vh" flex="~ col" items-center justify-center>
    <div>
      <ModernLogo title="SHOMPINICE" />
      <RouterView />
      <div h="30px" flex="~" items-center justify-between>
        <AppLink v-for="item in social" :key="item.name" :to="item.link" :title="item.name">
          <div :class="item.icon" />
        </AppLink>
      </div>
    </div>
  </div>
</template>
