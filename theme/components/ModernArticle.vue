<script setup lang="ts">
import { useFrontmatter, useSiteConfig } from 'valaxy'
import { computed } from 'vue'

const fm = useFrontmatter()
const siteConfig = useSiteConfig()

const relativeTime = computed(() => {
  if (!fm.value?.updated)
    return

  const updatedDate = fm.value.updated instanceof Date
    ? fm.value.updated
    : new Date(fm.value.updated)

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - updatedDate.getTime()) / 1000)

  const intervals = {
    年: 31536000,
    月: 2592000,
    周: 604800,
    天: 86400,
    小时: 3600,
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return `${interval}${unit}前更新`
    }
  }

  return '刚刚更新'
})
</script>

<template>
  <article mt="14vh">
    <header class="px-59px pt-6 space-y-1 xl:pb-10">
      <h1
        class="st-text text-3xl font-extrabold leading-9 tracking-tight md:text-5xl sm:text-4xl md:leading-14 sm:leading-10"
      >
        {{ fm.title }}
      </h1>

      <div v-if="siteConfig.statistics.enable" color="gray-500" pt7>
        <template v-if="fm.updated || fm.readingTime || fm.wordCount">
          <span v-if="fm.updated" class="inline-flex-center reading-time whitespace-nowrap">
            {{ relativeTime }}
          </span>

          <span v-if="fm.updated && (fm.readingTime || fm.wordCount)"> · </span>

          <span v-if="fm.readingTime" class="inline-flex-center reading-time whitespace-nowrap">
            <time m="l-1">{{ fm.readingTime }} 分钟阅读</time>
          </span>

          <span v-if="fm.readingTime && fm.wordCount"> · </span>

          <span v-if="fm.wordCount" class="inline-flex-center word-count whitespace-nowrap">
            <span m="l-1">{{ fm.wordCount }} 字</span>
          </span>
        </template>
      </div>
    </header>

    <div
      class="divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700"
      style="grid-template-rows: auto 1fr"
    >
      <div class="xl:col-span-3 xl:row-span-2 divide-y divide-gray-200 xl:pb-0 dark:divide-gray-700">
        <slot />
      </div>
    </div>
  </article>
</template>
