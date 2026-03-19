import { computed, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  buildBrowserStack,
  enterBrowserPage,
  normalizeSidebarTree
} from '../components/sidebar/sidebar-normalize'
import {
  buildSidebarStorageKey,
  resolveInitialExpansionMode,
  resolveInitialSidebarViewMode,
  resolveSidebarStorageScope
} from './sidebar-preferences'
import { resetBrowserStackToRoot, resolveBrowserStack, resolveExpandedKeys, type TreeExpansionMode } from './sidebar-state'

export type SidebarViewMode = 'tree' | 'browser'

function readJsonArray(key: string): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function useSidebarNavigator() {
  const route = useRoute()
  const { theme } = useData()

  const viewMode = ref<SidebarViewMode>('tree')
  const expandedKeys = ref<string[]>([])
  const expansionMode = ref<TreeExpansionMode>('all')

  const nodes = computed(() => normalizeSidebarTree((theme.value.sidebar ?? {}) as any, route.path))
  const storageScope = computed(() => resolveSidebarStorageScope(theme.value.sidebar ?? {}, route.path))
  const browserStack = ref(buildBrowserStack(nodes.value, route.path))

  function syncRouteState() {
    expandedKeys.value = resolveExpandedKeys(nodes.value, route.path, expandedKeys.value, expansionMode.value)
    browserStack.value = resolveBrowserStack(nodes.value, route.path, browserStack.value)
  }

  function loadStoredState(scope: string) {
    if (typeof window === 'undefined') {
      syncRouteState()
      return
    }

    viewMode.value = resolveInitialSidebarViewMode(
      window.localStorage.getItem(buildSidebarStorageKey(scope, 'view-mode'))
    )
    expansionMode.value = resolveInitialExpansionMode(
      window.localStorage.getItem(buildSidebarStorageKey(scope, 'expansion-mode'))
    )
    expandedKeys.value = readJsonArray(buildSidebarStorageKey(scope, 'expanded-keys'))

    const routeStack = buildBrowserStack(nodes.value, route.path)
    const storedBrowserKeys = readJsonArray(buildSidebarStorageKey(scope, 'browser-stack'))
    if (storedBrowserKeys.length) {
      browserStack.value = resolveBrowserStack(
        nodes.value,
        route.path,
        routeStack.filter((page) => storedBrowserKeys.includes(page.key))
      )
    } else {
      browserStack.value = routeStack
    }

    syncRouteState()
  }

  watch(storageScope, loadStoredState, { immediate: true })
  watch([nodes, () => route.path], syncRouteState)

  watch(viewMode, (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(buildSidebarStorageKey(storageScope.value, 'view-mode'), value)
  })

  watch(expansionMode, (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(buildSidebarStorageKey(storageScope.value, 'expansion-mode'), value)
  })

  watch(expandedKeys, (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(buildSidebarStorageKey(storageScope.value, 'expanded-keys'), JSON.stringify(value))
  }, { deep: true })

  watch(browserStack, (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      buildSidebarStorageKey(storageScope.value, 'browser-stack'),
      JSON.stringify(value.map((page) => page.key))
    )
  })

  function setViewMode(mode: SidebarViewMode) {
    viewMode.value = mode
  }

  function toggleViewMode() {
    viewMode.value = viewMode.value === 'tree' ? 'browser' : 'tree'
  }

  function toggleFolder(key: string) {
    expansionMode.value = 'auto'

    if (expandedKeys.value.includes(key)) {
      expandedKeys.value = expandedKeys.value.filter((item) => item !== key)
      return
    }

    expandedKeys.value = [...expandedKeys.value, key]
  }

  function expandAll() {
    expansionMode.value = 'all'
    expandedKeys.value = resolveExpandedKeys(nodes.value, route.path, expandedKeys.value, 'all')
  }

  function collapseAll() {
    expansionMode.value = 'auto'
    expandedKeys.value = resolveExpandedKeys(nodes.value, route.path, [], 'auto')
  }

  function enterBrowserNode(key: string) {
    browserStack.value = enterBrowserPage(browserStack.value, nodes.value, key)
  }

  function goBackBrowser() {
    if (browserStack.value.length <= 1) return
    browserStack.value = browserStack.value.slice(0, -1)
  }

  function goHomeBrowser() {
    browserStack.value = resetBrowserStackToRoot(browserStack.value)
  }

  return {
    viewMode,
    nodes,
    expandedKeys,
    browserStack,
    canGoBack: computed(() => browserStack.value.length > 1),
    setViewMode,
    toggleViewMode,
    toggleFolder,
    expandAll,
    collapseAll,
    enterBrowserNode,
    goBackBrowser,
    goHomeBrowser
  }
}
