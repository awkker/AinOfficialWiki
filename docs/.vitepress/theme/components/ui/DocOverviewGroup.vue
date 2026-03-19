<script setup lang="ts">
import { computed } from 'vue'
import { toDocAnchorId } from './breadcrumbs'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    description?: string
  }>(),
  {
    id: '',
    title: '',
    description: ''
  }
)

const resolvedId = computed(() => props.id || (props.title ? toDocAnchorId(props.title) : ''))
</script>

<template>
  <section class="vp-pro-doc-overview-group" :aria-labelledby="resolvedId || undefined">
    <header v-if="title || description" class="vp-pro-doc-overview-group__header">
      <h2 v-if="title" :id="resolvedId || undefined" class="vp-pro-doc-overview-group__title">{{ title }}</h2>
      <p v-if="description" class="vp-pro-doc-overview-group__description">{{ description }}</p>
    </header>
    <div class="vp-pro-doc-overview-group__grid">
      <slot />
    </div>
  </section>
</template>
