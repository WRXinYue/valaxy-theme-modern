<script lang="ts" setup>
import { useSiteConfig, useValaxyConfig } from 'valaxy'
import pkg from 'valaxy/package.json'
import { capitalize, computed } from 'vue'

import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'

const { t } = useI18n()

const config = useValaxyConfig()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const year = new Date().getFullYear()

const isThisYear = computed(() => {
  return year === themeConfig.value.footer.since
})

const poweredHtml = computed(() => t('footer.powered', [`<a href="${pkg.repository}" target="_blank" rel="noopener">Valaxy</a> v${pkg.version}`]))
const footerIcon = computed(() => themeConfig.value.footer.icon!)
</script>

<template>
  <footer class="va-footer modern-footer border-t border-gray-100 px-6 py-12 dark:border-gray-800" text="center sm" style="color:var(--va-c-text-light)">
    <div class="modern-container mx-auto max-w-4xl">
      <div v-if="themeConfig.footer.beian?.enable && themeConfig.footer.beian.icp" class="beian modern-beian my-2 text-sm opacity-80">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="transition hover:opacity-100">
          {{ themeConfig.footer.beian.icp }}
        </a>
      </div>

      <div class="copyright modern-copyright my-3 flex items-center justify-center gap-2 text-sm font-light">
        <span>
          &copy;
          <template v-if="!isThisYear">
            {{ themeConfig.footer.since }} -
          </template>
          {{ year }}
        </span>

        <a v-if="footerIcon.name" class="modern-icon-link mx-1 transition hover:opacity-80" :href="footerIcon.url" target="_blank" :title="footerIcon.title">
          <div class="modern-icon" :class="[footerIcon.name]" />
        </a>

        <span>{{ siteConfig.author.name }}</span>
      </div>

      <div v-if="themeConfig.footer.powered" class="powered modern-powered mt-4 text-xs font-light opacity-70">
        <span v-html="poweredHtml" /> | <span>{{ t('footer.theme') }} - <a :href="themeConfig.pkg.homepage" :title="`valaxy-theme-${config.theme}`" target="_blank" class="modern-link hover:text-primary transition duration-300">{{ capitalize(config.theme) }}</a> v{{ themeConfig.pkg.version }}</span>
      </div>

      <slot />
    </div>
  </footer>
</template>

<style lang="scss">
.modern-footer {
  letter-spacing: 0.015em;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: var(--va-c-primary);
    }
  }

  .modern-icon {
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
