<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const rootEl = ref<HTMLElement | null>(null)
const allCollapsed = ref(true)
const hasCollapsible = ref(false)

let navEl: HTMLElement | null = null
let observer: MutationObserver | null = null

const buttonLabel = computed(() => (allCollapsed.value ? '全部展开' : '全部折叠'))

function getTargetCarets(collapsed: boolean): HTMLElement[] {
  if (!navEl) return []

  const selector = collapsed
    ? '.VPSidebarItem.collapsible.collapsed > .item > .caret'
    : '.VPSidebarItem.collapsible:not(.collapsed) > .item > .caret'

  return Array.from(navEl.querySelectorAll<HTMLElement>(selector))
}

function syncSidebarState() {
  if (!navEl) {
    hasCollapsible.value = false
    allCollapsed.value = true
    return
  }

  hasCollapsible.value = navEl.querySelector('.VPSidebarItem.collapsible') != null
  allCollapsed.value = navEl.querySelector('.VPSidebarItem.collapsible:not(.collapsed)') == null
}

function emitClick(el: HTMLElement) {
  el.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )
}

function toggleAll() {
  const shouldExpandAll = allCollapsed.value
  const targets = getTargetCarets(shouldExpandAll)

  for (const target of targets) {
    emitClick(target)
  }

  window.requestAnimationFrame(syncSidebarState)
}

onMounted(() => {
  navEl = rootEl.value?.closest('.nav') as HTMLElement | null
  syncSidebarState()

  if (!navEl) return

  observer = new MutationObserver(() => {
    syncSidebarState()
  })
  observer.observe(navEl, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  })
})

watch(
  () => route.path,
  () => {
    void nextTick().then(() => {
      if (!navEl) {
        navEl = rootEl.value?.closest('.nav') as HTMLElement | null
      }
      syncSidebarState()
    })
  }
)

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  navEl = null
})
</script>

<template>
  <div ref="rootEl" class="vp-sidebar-bulk-toggle" v-show="hasCollapsible">
    <button type="button" class="vp-sidebar-bulk-toggle__button" @click="toggleAll">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style scoped>
.vp-sidebar-bulk-toggle {
  position: fixed;
  left: 0;
  top: calc(var(--vp-layout-top-height, 0px) + var(--vp-nav-height));
  z-index: calc(var(--vp-z-index-sidebar) + 1);
  width: var(--vp-sidebar-width);
  padding: 10px 32px;
  border-bottom: 1px solid var(--vp-c-divider-light);
  background: var(--vp-sidebar-bg-color);
}

.vp-sidebar-bulk-toggle__button {
  width: 100%;
  min-height: 34px;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 10px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.vp-sidebar-bulk-toggle__button:hover {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 36%, transparent);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-mute));
}

.vp-sidebar-bulk-toggle__button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 26%, transparent);
}

@media (min-width: 1440px) {
  .vp-sidebar-bulk-toggle {
    padding-right: 32px;
    padding-left: max(32px, calc((100vw - (var(--vp-layout-max-width) - 64px)) / 2));
    width: calc((100vw - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
  }
}

@media (max-width: 959px) {
  .vp-sidebar-bulk-toggle {
    position: static;
    top: auto;
    width: auto;
    padding: 10px 0 0;
    border-top: 0;
    border-bottom: 0;
    background: transparent;
  }
}
</style>
