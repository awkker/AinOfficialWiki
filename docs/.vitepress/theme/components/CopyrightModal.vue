<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="copyright-modal-overlay" @click="closeModal">
        <div class="copyright-modal" @click.stop>
          <div class="copyright-modal-header">
            <h3 class="copyright-modal-title">版权声明</h3>
            <button class="copyright-modal-close" @click="closeModal" aria-label="关闭">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="copyright-modal-body">
            <p class="copyright-text">
              本内容由 <strong>3D环梦工坊编程竞赛组</strong> 独立创作，版权所有。
            </p>
            
            <p class="copyright-text">
              未经书面授权，严禁以任何形式复制、转载或分发。我们将对侵权行为追究法律责任。
            </p>
            
            <div class="copyright-contact">
              <p class="copyright-text">如有疑问或需要讨论，欢迎加入我们的官方QQ交流群：</p>
              <a 
                href="https://qm.qq.com/q/ZlktjRUdqg" 
                target="_blank" 
                rel="noopener noreferrer"
                class="copyright-link"
              >
                915668300
              </a>
            </div>
          </div>
          
          <div class="copyright-modal-footer">
            <button class="copyright-btn" @click="closeModal">
              我已知晓
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'

const isVisible = ref(false)
const route = useRoute()

// 判断是否为主页
const isHomePage = () => {
  return route.path === '/' || route.path === '/index' || route.path === '/index.html'
}

// 处理复制事件
const handleCopy = (_e: ClipboardEvent) => {
  // 如果在主页，不显示弹窗
  if (isHomePage()) {
    return
  }
  
  // 显示版权声明弹窗
  isVisible.value = true
}

// 关闭模态框
const closeModal = () => {
  isVisible.value = false
}

// ESC键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isVisible.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('copy', handleCopy)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('copy', handleCopy)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.copyright-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 20, 41, 0.56);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.copyright-modal {
  background: linear-gradient(145deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border-radius: 16px;
  box-shadow: var(--vp-shadow-3);
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  border: 1px solid var(--vp-c-divider-light);
  transform-origin: center;
}

.copyright-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.copyright-modal-title {
  margin: 0;
  font-family: var(--vp-font-family-base);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-1);
}

.copyright-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--vp-c-divider-light);
  background: var(--vp-c-bg-mute);
  border-radius: 10px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  padding: 0;
}

.copyright-modal-close:hover {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.copyright-modal-body {
  padding: 20px 24px;
  color: var(--vp-c-text-1);
  line-height: 1.78;
}

.copyright-text {
  margin: 0 0 14px 0;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.copyright-text:last-child {
  margin-bottom: 0;
}

.copyright-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.copyright-contact {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, var(--vp-c-default-soft) 0%, var(--vp-c-brand-soft) 100%);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider-light);
}

.copyright-contact .copyright-text {
  margin-bottom: 8px;
  font-size: 14px;
}

.copyright-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  text-decoration: none;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-size: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.copyright-link:hover {
  transform: translateY(-1px);
  box-shadow: var(--vp-shadow-2);
}

.copyright-modal-footer {
  padding: 14px 24px 20px;
  border-top: 1px solid var(--vp-c-divider-light);
  display: flex;
  justify-content: flex-end;
}

.copyright-btn {
  padding: 9px 20px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.copyright-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--vp-shadow-2);
}

.copyright-btn:active {
  transform: scale(0.99);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.24s ease;
}

.modal-enter-active .copyright-modal,
.modal-leave-active .copyright-modal {
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .copyright-modal,
.modal-leave-to .copyright-modal {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (max-width: 640px) {
  .copyright-modal {
    max-width: 100%;
    border-radius: 16px;
    max-height: 84vh;
  }

  .copyright-modal-header {
    padding: 16px 20px;
  }

  .copyright-modal-title {
    font-size: 18px;
  }

  .copyright-modal-body {
    padding: 20px;
  }

  .copyright-text {
    font-size: 14px;
  }

  .copyright-link {
    font-size: 14px;
    padding: 6px 14px;
  }
}

.dark .copyright-modal-overlay {
  background: rgba(2, 8, 18, 0.7);
}

.dark .copyright-modal {
  box-shadow: 0 26px 62px rgba(3, 10, 24, 0.62);
}
</style>
