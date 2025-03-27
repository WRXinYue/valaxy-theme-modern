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
  <main w="41vw" flex="~">
    <div w="full" flex="~">
      <slot name="main">
        <div class="content" flex="~ col grow" w="full">
          <slot name="main-header" />
          <slot name="main-header-after" />

          <slot name="main-content">
            <div class="max-w-none pb-8 prose">
              <ValaxyMd :frontmatter="frontmatter">
                <slot name="main-content-md" />
                <slot />
              </ValaxyMd>
            </div>
            <slot name="main-content-after" />
          </slot>
        </div>

        <slot name="main-nav-before" />

        <slot name="main-nav" />

        <slot name="main-nav-after" />

        <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment" />

        <slot name="footer" />
      </slot>
    </div>

    <slot name="aside" />
  </main>
</template>
