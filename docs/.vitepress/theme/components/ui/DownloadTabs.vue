<script setup lang="ts">
import { computed } from 'vue'
import { resolveCloudProvider } from './cloud-providers'
import Tab from './Tab.vue'
import Tabs from './Tabs.vue'

type DownloadTabItem =
  | string
  | {
      value: string
      label?: string
      icon?: string
      description?: string
    }

const props = withDefaults(
  defineProps<{
    label?: string
    title?: string
    defaultValue?: string
    providers: DownloadTabItem[]
  }>(),
  {
    label: '下载渠道',
    title: '',
    defaultValue: ''
  }
)

const resolvedProviders = computed(() => {
  return props.providers.map((item) => {
    const value = typeof item === 'string' ? item : item.value
    const meta = resolveCloudProvider(value)

    return {
      value: meta?.alias || value,
      label: typeof item === 'string' ? (meta?.name || value) : (item.label || meta?.name || value),
      icon: typeof item === 'string' ? (meta?.icon || 'provider:download') : (item.icon || meta?.icon || 'provider:download'),
      description: typeof item === 'string' ? '' : (item.description || ''),
      provider: meta
    }
  })
})

const resolvedDefaultValue = computed(() => {
  if (props.defaultValue) return props.defaultValue
  return resolvedProviders.value[0]?.value || ''
})
</script>

<template>
  <section class="vp-pro-download-tabs">
    <p v-if="title" class="vp-pro-download-tabs__title">{{ title }}</p>

    <Tabs :default-value="resolvedDefaultValue" :label="label">
      <Tab
        v-for="item in resolvedProviders"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :icon="item.icon"
      >
        <p v-if="item.description" class="vp-pro-download-tabs__description">{{ item.description }}</p>
        <slot :provider="item.provider" :tab="item" />
      </Tab>
    </Tabs>
  </section>
</template>
