<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { tabsContextKey } from './tabs-context'
import type { TabMeta } from './tabs-context'

const props = withDefaults(
  defineProps<{
    label?: string
    defaultValue?: string
  }>(),
  {
    label: 'Tabs',
    defaultValue: ''
  }
)

const tabs = ref<TabMeta[]>([])
const activeValue = ref('')

function findFirstEnabled(): string {
  return tabs.value.find((tab) => !tab.disabled)?.value ?? ''
}

function ensureActiveTab() {
  if (props.defaultValue) {
    const defaultTab = tabs.value.find((tab) => tab.value === props.defaultValue && !tab.disabled)
    if (defaultTab) {
      activeValue.value = defaultTab.value
      return
    }
  }

  const active = tabs.value.find((tab) => tab.value === activeValue.value && !tab.disabled)
  if (!active) {
    activeValue.value = findFirstEnabled()
  }
}

function registerTab(tab: TabMeta) {
  const index = tabs.value.findIndex((item) => item.value === tab.value)

  if (index >= 0) {
    tabs.value[index] = tab
  } else {
    tabs.value = [...tabs.value, tab]
  }

  ensureActiveTab()
}

function unregisterTab(value: string) {
  tabs.value = tabs.value.filter((item) => item.value !== value)
  ensureActiveTab()
}

function activate(value: string) {
  const tab = tabs.value.find((item) => item.value === value)
  if (!tab || tab.disabled) return
  activeValue.value = value
}

watch(
  () => props.defaultValue,
  () => {
    ensureActiveTab()
  }
)

provide(tabsContextKey, {
  activeValue,
  registerTab,
  unregisterTab,
  activate
})
</script>

<template>
  <section class="vp-pro-tabs">
    <div class="vp-pro-tabs__list" role="tablist" :aria-label="label">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="vp-pro-tabs__trigger"
        :class="{ 'is-active': activeValue === tab.value }"
        :aria-selected="activeValue === tab.value ? 'true' : 'false'"
        :disabled="tab.disabled"
        @click="activate(tab.value)"
      >
        <BaseIcon v-if="tab.icon" :icon="tab.icon" :width="14" :height="14" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="vp-pro-tabs__panels">
      <slot />
    </div>
  </section>
</template>
