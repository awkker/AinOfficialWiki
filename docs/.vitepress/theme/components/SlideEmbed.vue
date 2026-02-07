<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    title: string
    height?: number | string
    timeoutMs?: number
  }>(),
  {
    height: 600,
    timeoutMs: 12000
  }
)

const isLoading = ref(true)
const isTimedOut = ref(false)
const iframeKey = ref(0)

let timeoutHandle: ReturnType<typeof setTimeout> | null = null

const normalizedHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

function clearTimer() {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle)
    timeoutHandle = null
  }
}

function startLoadingTimer() {
  clearTimer()
  isLoading.value = true
  isTimedOut.value = false
  timeoutHandle = setTimeout(() => {
    isLoading.value = false
    isTimedOut.value = true
  }, props.timeoutMs)
}

function handleLoaded() {
  clearTimer()
  isLoading.value = false
  isTimedOut.value = false
}

function retryLoad() {
  iframeKey.value += 1
  startLoadingTimer()
}

watch(
  () => props.src,
  () => {
    iframeKey.value += 1
    startLoadingTimer()
  }
)

onMounted(() => {
  startLoadingTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <section class="slide-embed" :style="{ '--slide-embed-height': normalizedHeight }">
    <div class="slide-embed__shell">
      <iframe
        :key="iframeKey"
        class="slide-embed__frame"
        :src="src"
        :title="title"
        loading="lazy"
        allow="fullscreen"
        frameborder="0"
        scrolling="no"
        @load="handleLoaded"
      />

      <div v-if="isLoading || isTimedOut" class="slide-embed__overlay" aria-live="polite">
        <div v-if="!isTimedOut" class="slide-embed__skeleton">
          <div class="slide-embed__pulse slide-embed__pulse--lg" />
          <div class="slide-embed__pulse" />
          <div class="slide-embed__pulse slide-embed__pulse--sm" />
          <p class="slide-embed__status">正在加载幻灯片，请稍候...</p>
        </div>

        <div v-else class="slide-embed__fallback">
          <p class="slide-embed__status slide-embed__status--warn">
            加载时间较长，可能是网络到第三方资源较慢。
          </p>
          <div class="slide-embed__actions">
            <button type="button" class="slide-embed__btn" @click="retryLoad">重新加载</button>
            <a class="slide-embed__link" :href="src" target="_blank" rel="noopener noreferrer">新窗口打开</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
