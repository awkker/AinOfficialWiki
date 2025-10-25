import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress/',
  title: "3D环梦工坊编程竞赛组",
  description: '官方网站&知识库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '讲义', link: '/Handouts' },
      { text: '幻灯片', link: '/slides' },
      { text: '教程', link: '/guides/Dev' },
      { text: '资源', link: '/resource/2025'},
      { text: '竞赛', link: 'competition' }
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
      { text: '2025年第零堂课', link: '/resource/2025'}, 
      { text: '2025年见面会', link: '/resource/2025见面会'},//第0课等
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
      { icon: 'github', link: 'https://ain.hmgf.hxcn.space' }
    ]
  }
})
