import type { TreeExpansionMode } from './sidebar-state'
import type { SidebarViewMode } from './useSidebarNavigator'
import { normalizeDocPath } from '../components/ui/breadcrumbs'

function isSidebarMap(sidebar: unknown): sidebar is Record<string, unknown> {
  return Boolean(sidebar) && !Array.isArray(sidebar)
}

export function resolveInitialSidebarViewMode(value: string | null): SidebarViewMode {
  return value === 'browser' ? 'browser' : 'tree'
}

export function resolveInitialExpansionMode(value: string | null): TreeExpansionMode {
  return value === 'auto' ? 'auto' : 'all'
}

export function resolveSidebarStorageScope(sidebar: unknown, routePath: string): string {
  const normalizedRoute = normalizeDocPath(routePath)

  if (!isSidebarMap(sidebar)) {
    const topLevel = normalizedRoute.split('/').filter(Boolean)[0]
    return topLevel ? `/${topLevel}` : '/'
  }

  const matches = Object.keys(sidebar)
    .map((key) => normalizeDocPath(key))
    .filter((key) => normalizedRoute === key || normalizedRoute.startsWith(`${key}/`))
    .sort((a, b) => b.length - a.length)

  return matches[0] ?? '/'
}

export function buildSidebarStorageKey(scope: string, suffix: string): string {
  return `vp-pro-sidebar-${suffix}::${normalizeDocPath(scope)}`
}
