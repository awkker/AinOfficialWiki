<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useSlots, watch } from 'vue'
import { tabsContextKey } from './tabs-context'
import { useMarkdownSlot } from './slot-markdown'

const props = withDefaults(
  defineProps<{
    value: string
    label?: string
    icon?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    icon: '',
    disabled: false
  }
)

const context = inject(tabsContextKey, null)

const tabMeta = computed(() => ({
  value: props.value,
  label: props.label || props.value,
  icon: props.icon,
  disabled: props.disabled
}))

const isActive = computed(() => {
  if (!context) return true
  return context.activeValue.value === props.value
})

let registeredValue = ''

onMounted(() => {
  if (!context) return
  context.registerTab(tabMeta.value)
  registeredValue = tabMeta.value.value
})

watch(tabMeta, (nextValue) => {
  if (!context) return

  if (registeredValue && registeredValue !== nextValue.value) {
    context.unregisterTab(registeredValue)
  }

  context.registerTab(nextValue)
  registeredValue = nextValue.value
})

onBeforeUnmount(() => {
  if (!context || !registeredValue) return
  context.unregisterTab(registeredValue)
})

const slots = useSlots()
const { useMarkdown, renderedHtml } = useMarkdownSlot(slots)
</script>

<template>
  <section
    v-show="isActive"
    class="vp-pro-tab"
    role="tabpanel"
    :data-tab="value"
  >
    <div v-if="useMarkdown" class="vp-pro-slot-markdown" v-html="renderedHtml" />
    <slot v-else />
  </section>
</template>
