import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ResolvedCloudProvider } from './cloud-providers'

export type FileTreeVariant = 'default' | 'download'

export interface FileTreeContext {
  depth: Ref<number>
  variant: ComputedRef<FileTreeVariant>
  provider: ComputedRef<ResolvedCloudProvider | null>
}

export const fileTreeContextKey: InjectionKey<FileTreeContext> = Symbol('vp-pro-file-tree-context')
