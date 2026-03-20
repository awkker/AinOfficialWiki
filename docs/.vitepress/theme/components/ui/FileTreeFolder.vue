<script setup lang="ts">
import { computed, inject, provide, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import Popover from './Popover.vue'
import { addToast } from './toast'
import { fileTreeContextKey } from './file-tree-context'
import { resolveCloudProvider } from './cloud-providers'
import type { FileTreeDownloadLinks } from './file-tree-download-links'
import { resolveFileTreeDownloadLink } from './file-tree-download-links'
import { writeClipboard } from '../../utils/clipboard'

const props = withDefaults(
  defineProps<{
    name: string
    icon?: string
    openIcon?: string
    closedIcon?: string
    href?: string
    target?: string
    defaultOpen?: boolean
    size?: string
    description?: string
    provider?: string
    extractionCode?: string
    links?: FileTreeDownloadLinks
  }>(),
  {
    icon: '',
    openIcon: '',
    closedIcon: '',
    href: '',
    target: '',
    defaultOpen: true,
    size: '',
    description: '',
    provider: '',
    extractionCode: '',
    links: undefined
  }
)

const parentContext = inject(fileTreeContextKey, null)

const currentDepth = computed(() => parentContext?.depth.value ?? 0)
const childDepth = computed(() => currentDepth.value + 1)
const variant = computed(() => parentContext?.variant.value ?? 'default')
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

provide(fileTreeContextKey, {
  depth: childDepth,
  variant,
  provider: resolvedProvider
})

const isOpen = ref(props.defaultOpen)

watch(
  () => props.defaultOpen,
  (value) => {
    isOpen.value = value
  }
)

function handleToggle(event: Event) {
  const details = event.target as HTMLDetailsElement | null
  isOpen.value = Boolean(details?.open)
}

const resolvedOpenIcon = computed(() => props.openIcon || props.icon || 'mdi:folder-open-outline')
const resolvedClosedIcon = computed(() => props.closedIcon || props.icon || 'mdi:folder-outline')

const isExternal = computed(() => /^https?:\/\//i.test(resolvedHref.value))

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
  <li class="vp-pro-file-tree-folder" :style="{ '--vp-pro-file-depth': String(currentDepth) }">
    <details class="vp-pro-file-tree-folder__details" :open="isOpen" @toggle="handleToggle">
      <summary class="vp-pro-file-tree-folder__summary">
        <span class="vp-pro-file-tree-folder__chevron">
          <BaseIcon icon="mdi:chevron-right" :width="14" :height="14" />
        </span>
        <BaseIcon :icon="isOpen ? resolvedOpenIcon : resolvedClosedIcon" :width="16" :height="16" />
        <span class="vp-pro-file-tree-file__body">
          <span class="vp-pro-file-tree-file__headline">
            <span class="vp-pro-file-tree-folder__label">
              <span class="vp-pro-file-tree-folder__name">{{ name }}</span>
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
                class="vp-pro-file-tree-folder__link"
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
      </summary>
      <ul class="vp-pro-file-tree-folder__group" role="group">
        <slot />
      </ul>
    </details>
  </li>
</template>
