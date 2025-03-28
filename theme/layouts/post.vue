<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('md')

const isPostDetail = computed(() => {
  return route.path.startsWith('/posts/') && route.path !== '/posts'
})

const showPostList = computed(() => {
  return !isMobile.value || !isPostDetail.value
})

const showArticle = computed(() => {
  return !isMobile.value || isPostDetail.value
})
</script>

<template>
  <div flex="~">
    <ModernPostList v-if="showPostList" />

    <div v-if="showArticle" w="md:76vw full" max-h="100vh" flex="md:~" justify-center overflow-y-auto>
      <ModernArticle>
        <RouterView />
      </ModernArticle>
    </div>
  </div>
</template>
