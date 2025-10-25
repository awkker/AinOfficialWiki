import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress/',
  title: "Welcome to all in nanami's wiki",
  description: 'Handouts,slides,guides,resource',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Handouts', link: '/Handouts' },
      { text: 'slides', link: '/slides' },
      { text: 'guides', link: '/guides/Dev' },
      { text: 'resource', link: '/resource/2025'},
      { text: 'competition', link: 'competition' }
    ],

    sidebar: [
      {
        text: 'Handouts',
        items: [
          { text: 'Handouts', link: '/Handouts' }, //讲义文章罗列
        ]
      },
      {
        text: 'slides',
        items: [
      { text: 'slides', link: '/slides' }, //PPT罗列
        ]
      },
      {
        text: 'guides',
        items: [
      { text: 'Dev教程', link: '/guides/Dev' }, //教程罗列
        ]
      },
      {
        text: 'resource',
        items: [
      { text: '2025年第零堂课', link: '/resource/2025'}, //第0课等
        ]
      },
      {
        text: 'competition',
        items: [
      { text: 'competition', link: 'competition' } //竞赛相关文章罗列
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
