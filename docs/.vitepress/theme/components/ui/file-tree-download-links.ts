import type { ResolvedCloudProvider } from './cloud-providers'

export type FileTreeDownloadLinkOverride =
  | string
  | null
  | false
  | {
      href?: string
      target?: string
      extractionCode?: string
      description?: string
      size?: string
    }

export type FileTreeDownloadLinks = Record<string, FileTreeDownloadLinkOverride>

export type ResolvedFileTreeDownloadLink = {
  href?: string
  target?: string
  extractionCode?: string
  description?: string
  size?: string
}

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/[_\s-]+/g, '')
}

export function resolveFileTreeDownloadLink(
  provider: ResolvedCloudProvider | null,
  links?: FileTreeDownloadLinks | null
): ResolvedFileTreeDownloadLink | null {
  if (!provider || !links) return null

  const directKeys = [provider.alias, ...provider.aliases].map(normalizeKey)
  const matchedEntry = Object.entries(links).find(([key]) => directKeys.includes(normalizeKey(key)))

  if (!matchedEntry) return null

  const override = matchedEntry[1]
  if (override === false || override === null) {
    return {
      href: ''
    }
  }

  if (typeof override === 'string') {
    return {
      href: override
    }
  }

  return {
    href: override.href,
    target: override.target,
    extractionCode: override.extractionCode,
    description: override.description,
    size: override.size
  }
}
