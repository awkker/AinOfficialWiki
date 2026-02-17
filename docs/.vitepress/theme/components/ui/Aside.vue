<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { useMarkdownSlot } from './slot-markdown'

type AsideType = 'note' | 'tip' | 'info' | 'warning' | 'caution' | 'danger'

const props = withDefaults(
  defineProps<{
    type?: AsideType
    title?: string
    icon?: string
  }>(),
  {
    type: 'note',
    title: '',
    icon: ''
  }
)

const normalizedType = computed(() => {
  if (props.type === 'warning') return 'caution'
  return props.type
})

const typeTitleMap: Record<AsideType, string> = {
  note: '备注',
  tip: '提示',
  info: '说明',
  warning: '注意',
  caution: '注意',
  danger: '危险'
}

const typeIconMap: Record<AsideType, string> = {
  note: 'mdi:note-text-outline',
  tip: 'mdi:lightbulb-on-outline',
  info: 'mdi:information-outline',
  warning: 'mdi:alert-outline',
  caution: 'mdi:alert-outline',
  danger: 'mdi:alert-circle-outline'
}

const resolvedTitle = computed(() => {
  if (props.title) return props.title
  return typeTitleMap[props.type]
})

const resolvedIcon = computed(() => {
  if (props.icon) return props.icon
  return typeIconMap[props.type]
})

const slots = useSlots()
const { useMarkdown, renderedHtml } = useMarkdownSlot(slots)
</script>

<template>
  <aside class="vp-pro-aside" :class="`is-${normalizedType}`">
    <header class="vp-pro-aside__header">
      <BaseIcon :icon="resolvedIcon" :width="18" :height="18" />
      <strong class="vp-pro-aside__title">{{ resolvedTitle }}</strong>
    </header>
    <div class="vp-pro-aside__body">
      <div v-if="useMarkdown" class="vp-pro-slot-markdown" v-html="renderedHtml" />
      <slot v-else />
    </div>
  </aside>
</template>
