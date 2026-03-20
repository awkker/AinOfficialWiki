<script setup lang="ts">
import { computed, inject } from 'vue'
import BaseIcon from './BaseIcon.vue'
import Popover from './Popover.vue'
import { addToast } from './toast'
import { fileTreeContextKey } from './file-tree-context'
import { resolveCloudProvider } from './cloud-providers'
import type { FileTreeDownloadLinks } from './file-tree-download-links'
import { resolveFileTreeDownloadLink } from './file-tree-download-links'
import { resolveFileIcon } from './icon-map'
import { writeClipboard } from '../../utils/clipboard'

const props = withDefaults(
  defineProps<{
    name: string
    icon?: string
    href?: string
    target?: string
    size?: string
    description?: string
    provider?: string
    extractionCode?: string
    links?: FileTreeDownloadLinks
  }>(),
  {
    icon: '',
    href: '',
    target: '',
    size: '',
    description: '',
    provider: '',
    extractionCode: '',
    links: undefined
  }
)

const parentContext = inject(fileTreeContextKey, null)

const depth = computed(() => parentContext?.depth.value ?? 0)
const variant = computed(() => parentContext?.variant.value ?? 'default')
const resolvedIcon = computed(() => props.icon || resolveFileIcon(props.name))
const resolvedProvider = computed(() => resolveCloudProvider(props.provider) ?? parentContext?.provider.value ?? null)
const resolvedLink = computed(() => resolveFileTreeDownloadLink(resolvedProvider.value, props.links))
const resolvedHref = computed(() => {
  if (!resolvedLink.value) return props.href
  return resolvedLink.value.href ?? ''
})
const resolvedDescription = computed(() => {
  const extractionCode = resolvedExtractionCode.value
  if (extractionCode) return ''
  return resolvedLink.value?.description ?? props.description
})
const resolvedSize = computed(() => resolvedLink.value?.size ?? props.size)
const resolvedExtractionCode = computed(() => resolvedLink.value?.extractionCode ?? props.extractionCode)
const isDownloadTree = computed(() => variant.value === 'download' && Boolean(resolvedHref.value))

const isExternal = computed(() => /^https?:\/\//i.test(resolvedHref.value ?? ''))

const resolvedTarget = computed(() => {
  if (!resolvedHref.value) return undefined
  if (resolvedLink.value?.target) return resolvedLink.value.target
  if (props.target) return props.target
  return isExternal.value ? '_blank' : undefined
})

function handleJump(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  if (!resolvedHref.value || typeof window === 'undefined') return

  if (resolvedTarget.value === '_blank') {
    window.open(resolvedHref.value, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.assign(resolvedHref.value)
}

async function copyExtractionCode() {
  if (!resolvedExtractionCode.value) return

  const copied = await writeClipboard(resolvedExtractionCode.value)
  addToast({
    title: copied ? '提取码已复制' : '复制失败',
    description: copied ? `已复制 ${resolvedExtractionCode.value}` : '请手动复制提取码',
    color: copied ? 'success' : 'warning'
  })
}
</script>

<template>
  <li class="vp-pro-file-tree-file" :style="{ '--vp-pro-file-depth': String(depth) }" role="treeitem">
    <span class="vp-pro-file-tree-file__line" />
    <span class="vp-pro-file-tree-file__content">
      <BaseIcon :icon="resolvedIcon" :width="16" :height="16" />
      <span class="vp-pro-file-tree-file__body">
        <span class="vp-pro-file-tree-file__headline">
          <span class="vp-pro-file-tree-file__label">
            <span class="vp-pro-file-tree-file__name">{{ name }}</span>
            <span v-if="resolvedSize" class="vp-pro-file-tree-file__size">{{ resolvedSize }}</span>
          </span>

          <span v-if="resolvedExtractionCode || isDownloadTree || resolvedHref" class="vp-pro-file-tree-file__actions">
            <button
              v-if="isDownloadTree"
              class="vp-pro-file-tree-file__download-badge"
              type="button"
              :aria-label="`下载 ${name}`"
              @click="handleJump"
            >
              点击下载
            </button>

            <button
              v-else-if="resolvedHref"
              class="vp-pro-file-tree-file__link"
              type="button"
              :aria-label="`打开 ${name}`"
              @click="handleJump"
            >
              <BaseIcon icon="mdi:open-in-new" :width="14" :height="14" />
            </button>
          </span>
        </span>

        <span v-if="resolvedDescription || resolvedExtractionCode" class="vp-pro-file-tree-file__meta">
          <Popover
            v-if="resolvedDescription"
            trigger="both"
            placement="top"
            :offset="6"
            :content="resolvedDescription"
            trigger-class="vp-pro-file-tree-file__desc-trigger"
          >
            <template #trigger>
              <span class="vp-pro-file-tree-file__desc">{{ resolvedDescription }}</span>
            </template>
          </Popover>

          <button
            v-if="resolvedExtractionCode"
            type="button"
            class="vp-pro-file-tree-file__copy-code"
            data-inline-copy="off"
            :aria-label="`复制 ${name} 的提取码 ${resolvedExtractionCode}`"
            @click.stop.prevent="copyExtractionCode"
          >
            <span class="vp-pro-file-tree-file__copy-badge">提取码：{{ resolvedExtractionCode }}</span>
          </button>
        </span>
      </span>
    </span>
  </li>
</template>
