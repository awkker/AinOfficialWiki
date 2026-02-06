// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import './style.css'
import CopyrightModal from './components/CopyrightModal.vue'
import ClerkToc from './components/ClerkToc.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 右侧 TOC 改为 Clerk 风格组件
      'aside-outline-before': () => h(ClerkToc),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 在布局底部插入版权声明模态框组件
      'layout-bottom': () => h(CopyrightModal)
    })
  }
} satisfies Theme
