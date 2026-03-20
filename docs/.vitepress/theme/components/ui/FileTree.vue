<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { fileTreeContextKey } from './file-tree-context'
import { resolveCloudProvider } from './cloud-providers'

const props = withDefaults(
  defineProps<{
    label?: string
    variant?: 'default' | 'download'
    provider?: string
    providerName?: string
    providerIcon?: string
    showHeader?: boolean
    title?: string
    description?: string
  }>(),
  {
    label: 'File tree',
    variant: 'default',
    provider: '',
    providerName: '',
    providerIcon: '',
    showHeader: true,
    title: '网盘下载',
    description: ''
  }
)

const depth = ref(0)
const provider = computed(() => {
  const resolved = resolveCloudProvider(props.provider)
  if (!resolved) return null

  return {
    ...resolved,
    name: props.providerName || resolved.name,
    icon: props.providerIcon || resolved.icon
  }
})
const variant = computed(() => {
  if (props.variant === 'download') return 'download'
  return provider.value ? 'download' : 'default'
})
const shouldShowHeader = computed(() => variant.value === 'download' && props.showHeader)

provide(fileTreeContextKey, {
  depth,
  variant,
  provider
})
</script>

<template>
  <section class="vp-pro-file-tree-wrap" :class="{ 'is-download': variant === 'download', 'has-header': shouldShowHeader }">
    <header v-if="shouldShowHeader" class="vp-pro-file-tree__header">
      <div class="vp-pro-file-tree__header-main">
        <span class="vp-pro-file-tree__header-icon">
          <BaseIcon :icon="provider?.icon || 'provider:download'" :width="18" :height="18" />
        </span>
        <div class="vp-pro-file-tree__header-copy">
          <p class="vp-pro-file-tree__header-title">{{ title }}</p>
          <p v-if="provider" class="vp-pro-file-tree__header-subtitle">
            <span>{{ provider.name }}</span>
            <code>{{ provider.alias }}</code>
          </p>
          <p v-else-if="description" class="vp-pro-file-tree__header-subtitle">
            {{ description }}
          </p>
        </div>
      </div>
    </header>

    <ul class="vp-pro-file-tree" role="tree" :aria-label="label">
      <slot />
    </ul>
  </section>
</template>
