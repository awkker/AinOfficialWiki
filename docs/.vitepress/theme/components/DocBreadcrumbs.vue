<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import Breadcrumbs from './ui/Breadcrumbs.vue'
import { buildBreadcrumbTrail, normalizeDocPath } from './ui/breadcrumbs'
import { computeBreadcrumbShellLayout, type BreadcrumbShellLayout } from './doc-breadcrumb-layout'

interface NavItemLike {
  text?: string
  link?: string
}

const route = useRoute()
const { theme, page } = useData()
const shellRef = ref<HTMLElement | null>(null)
const innerStyle = ref<BreadcrumbShellLayout | null>(null)

let shellResizeObserver: ResizeObserver | null = null
let contentResizeObserver: ResizeObserver | null = null
let observedContentElement: HTMLElement | null = null

const routePath = computed(() => normalizeDocPath(route.path))

const sectionBase = computed(() => {
  const sidebar = theme.value.sidebar
  if (!sidebar || Array.isArray(sidebar)) return routePath.value

  const matches = Object.keys(sidebar)
    .map((key) => normalizeDocPath(key))
    .filter((key) => routePath.value === key || routePath.value.startsWith(`${key}/`))
    .sort((a, b) => b.length - a.length)

  return matches[0] ?? routePath.value
})

const rootLabel = computed(() => {
  const navItems = (theme.value.nav ?? []) as NavItemLike[]
  const matchedNav = navItems.find((item) => {
    const link = item.link ? normalizeDocPath(item.link) : ''
    return link && (routePath.value === link || routePath.value.startsWith(`${link}/`) || link.startsWith(sectionBase.value))
  })

  return matchedNav?.text ?? page.value.relativePath.split('/')[0] ?? '文档'
})

const breadcrumbItems = computed(() => {
  const title = page.value.title || page.value.frontmatter?.title || rootLabel.value
  return buildBreadcrumbTrail({
    routePath: routePath.value,
    pageTitle: title,
    sidebar: (theme.value.sidebar ?? {}) as Record<string, unknown>,
    rootLabel: rootLabel.value
  })
})

function findContentContainer(): HTMLElement | null {
  const shell = shellRef.value
  if (!shell || typeof document === 'undefined') return null

  const docRoot = shell.closest('.VPDoc')
  return docRoot?.querySelector('.container .content .content-container') as HTMLElement | null
}

function syncShellLayout() {
  const shell = shellRef.value
  const content = findContentContainer()

  if (!shell || !content) {
    contentResizeObserver?.disconnect()
    observedContentElement = null
    innerStyle.value = null
    return
  }

  const shellRect = shell.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  innerStyle.value = computeBreadcrumbShellLayout(shellRect.left, contentRect.left, contentRect.width)

  if (observedContentElement === content || typeof ResizeObserver === 'undefined') return

  contentResizeObserver?.disconnect()
  observedContentElement = content
  contentResizeObserver = new ResizeObserver(() => {
    syncShellLayout()
  })
  contentResizeObserver.observe(content)
}

onMounted(() => {
  if (typeof window === 'undefined') return

  void nextTick().then(syncShellLayout)

  if (typeof ResizeObserver !== 'undefined' && shellRef.value) {
    shellResizeObserver = new ResizeObserver(() => {
      syncShellLayout()
    })
    shellResizeObserver.observe(shellRef.value)
  }

  window.addEventListener('resize', syncShellLayout, { passive: true })
})

watch(
  () => route.path,
  () => {
    void nextTick().then(syncShellLayout)
  }
)

onBeforeUnmount(() => {
  shellResizeObserver?.disconnect()
  contentResizeObserver?.disconnect()

  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', syncShellLayout)
  }
})
</script>

<template>
  <div v-if="breadcrumbItems.length" ref="shellRef" class="vp-pro-doc-breadcrumbs-shell">
    <div class="vp-pro-doc-breadcrumbs-shell__inner" :style="innerStyle ?? undefined">
      <Breadcrumbs :items="breadcrumbItems" />
    </div>
  </div>
</template>
