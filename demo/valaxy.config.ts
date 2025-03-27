import type { ThemeConfig } from 'valaxy-theme-modern'
import { defineConfig } from 'valaxy'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'modern',

  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'i-ri-home-line',
      },
      {
        text: 'MackBook',
        link: '/posts',
        icon: 'i-ri-menu-line',
      },
      {
        text: 'iPad',
        link: '/ipad',
        icon: 'i-ri-chat-1-line',
      },
      {
        text: 'About',
        link: '/about',
        icon: 'i-ri-information-line',
      },
    ],

    footer: {
      since: 2016,
    },
  },
})
