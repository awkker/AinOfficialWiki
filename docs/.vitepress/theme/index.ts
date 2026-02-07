// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import './style.css'
import CopyrightModal from './components/CopyrightModal.vue'
import ClerkToc from './components/ClerkToc.vue'
import SlideEmbed from './components/SlideEmbed.vue'
import DocCopyright from './components/DocCopyright.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SlideEmbed', SlideEmbed)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 右侧 TOC 改为 Clerk 风格组件
      'aside-outline-before': () => h(ClerkToc),
      // 放在文档 footer 内，显示在 Next/Previous 导航上方
      'doc-footer-before': () => h(DocCopyright),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 在布局底部插入版权声明模态框组件
      'layout-bottom': () => h(CopyrightModal)
    })
  }
} satisfies Theme
