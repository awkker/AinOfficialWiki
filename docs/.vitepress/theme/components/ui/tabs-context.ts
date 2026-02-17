import type { InjectionKey, Ref } from 'vue'

export interface TabMeta {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface TabsContext {
  activeValue: Ref<string>
  registerTab: (tab: TabMeta) => void
  unregisterTab: (value: string) => void
  activate: (value: string) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('vp-pro-tabs-context')
