<script lang="ts" setup>
import type { PageData, Post } from 'valaxy'
import { useSiteConfig } from 'valaxy'

defineProps<{
  frontmatter: Post
  data?: PageData
}>()
const siteConfig = useSiteConfig()
</script>

<template>
  <main w="md:41vw" class="modern-safe-padding">
    <div w="full">
      <slot name="main">
        <div class="content" w="full">
          <slot name="main-header" />
          <slot name="main-header-after" />

          <slot name="main-content">
            <ValaxyMd :frontmatter="frontmatter">
              <div class="max-w-none pb-8 prose">
                <slot name="main-content-md" />
                <slot />
              </div>
            </ValaxyMd>
            <slot name="main-content-after" />
          </slot>
        </div>

        <slot name="main-nav-before" />

        <slot name="main-nav" />

        <slot name="main-nav-after" />

        <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment" />

        <ModernFooter>
          <slot name="footer" />
        </ModernFooter>
      </slot>
    </div>

    <slot name="aside" />
  </main>
</template>
