<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { resolveLocalIconData } from './local-icons'

const props = withDefaults(
  defineProps<{
    icon: string
    width?: number | string
    height?: number | string
    color?: string
    inline?: boolean
  }>(),
  {
    width: 16,
    height: 16,
    inline: true
  }
)

const resolvedIcon = computed(() => resolveLocalIconData(props.icon))
</script>

<template>
  <Icon
    v-if="resolvedIcon"
    class="vp-pro-icon"
    :icon="resolvedIcon"
    :width="props.width"
    :height="props.height"
    :color="props.color"
    :inline="props.inline"
  />
  <span v-else class="vp-pro-icon" aria-hidden="true">•</span>
</template>
