export const GENERIC_CLOUD_PROVIDER_ICON = 'provider:download'

export interface CloudProviderDefinition {
  alias: string
  name: string
  icon: string
  aliases: string[]
  fallbackIcon?: boolean
}

export interface ResolvedCloudProvider extends CloudProviderDefinition {
  matchedBy: string
  custom?: boolean
}

const CLOUD_PROVIDER_DEFINITIONS: CloudProviderDefinition[] = [
  {
    alias: '115',
    name: '115',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['115', '115pan', '115网盘'],
    fallbackIcon: true
  },
  {
    alias: '123pan',
    name: '123网盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['123', '123pan', '123网盘'],
    fallbackIcon: true
  },
  {
    alias: 'mobile',
    name: '中国移动云盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['mobile', 'chinamobile', '中国移动云盘', '移动云盘'],
    fallbackIcon: true
  },
  {
    alias: 'ecloud',
    name: '天翼云盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['ecloud', '189cloud', '天翼云盘'],
    fallbackIcon: true
  },
  {
    alias: 'aliyundrive',
    name: '阿里云盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['aliyundrive', 'alipan', '阿里云盘'],
    fallbackIcon: true
  },
  {
    alias: 'openlist',
    name: 'OpenList',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['openlist', 'alist', 'OpenList', 'AList'],
    fallbackIcon: true
  },
  {
    alias: 'baidu',
    name: '百度网盘',
    icon: 'provider:baidu',
    aliases: ['baidu', '百度', '百度网盘', '百度云盘']
  },
  {
    alias: 'album',
    name: '一刻相册',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['album', 'yike', '一刻相册'],
    fallbackIcon: true
  },
  {
    alias: 'doubao',
    name: '豆包分享',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['doubao', 'doubaoshare', '豆包分享', '豆包'],
    fallbackIcon: true
  },
  {
    alias: 'gdrive',
    name: 'Google Drive',
    icon: 'provider:googledrive',
    aliases: ['gdrive', 'googledrive', 'google-drive', 'google drive', 'Google Drive']
  },
  {
    alias: 'lanzou',
    name: '蓝奏云',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['lanzou', 'lanzouyun', '蓝奏云', '蓝奏'],
    fallbackIcon: true
  },
  {
    alias: 'mseconds',
    name: '分秒帧',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['mseconds', 'fenmiaozhen', '分秒帧'],
    fallbackIcon: true
  },
  {
    alias: 'mega',
    name: 'Mega',
    icon: 'provider:mega',
    aliases: ['mega', 'Mega']
  },
  {
    alias: 'onedrive',
    name: 'OneDrive',
    icon: 'provider:onedrive',
    aliases: ['onedrive', 'OneDrive', 'microsoftonedrive']
  },
  {
    alias: 'pikpak',
    name: 'PikPak',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['pikpak', 'PikPak'],
    fallbackIcon: true
  },
  {
    alias: 'quark',
    name: '夸克网盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['quark', '夸克', '夸克网盘'],
    fallbackIcon: true
  },
  {
    alias: 'smb',
    name: 'SMB',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['smb', 'SMB'],
    fallbackIcon: true
  },
  {
    alias: 'teambition',
    name: 'Teambition',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['teambition', 'Teambition'],
    fallbackIcon: true
  },
  {
    alias: 'terabox',
    name: 'Terabox',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['terabox', 'TeraBox', 'Terabox'],
    fallbackIcon: true
  },
  {
    alias: 'xunlei',
    name: '迅雷',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['xunlei', 'thunder', '迅雷'],
    fallbackIcon: true
  },
  {
    alias: 'uc',
    name: 'UC网盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['uc', 'ucpan', 'UC', 'UC网盘'],
    fallbackIcon: true
  },
  {
    alias: 'unicom',
    name: '联通云盘',
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: ['unicom', 'chinaunicom', '联通云盘'],
    fallbackIcon: true
  },
  {
    alias: 'github',
    name: 'GitHub',
    icon: 'provider:github',
    aliases: ['github', 'GitHub']
  },
  {
    alias: 'icloud',
    name: 'iCloud',
    icon: 'provider:icloud',
    aliases: ['icloud', 'iCloud', 'appleicloud']
  }
]

function normalizeProviderToken(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, '')
}

function sanitizeCustomAlias(value: string): string {
  const normalized = normalizeProviderToken(value).replace(/[^\da-z\u4e00-\u9fa5]+/g, '')
  return normalized || 'download'
}

const CLOUD_PROVIDER_LOOKUP = new Map<string, CloudProviderDefinition>()

for (const definition of CLOUD_PROVIDER_DEFINITIONS) {
  for (const alias of definition.aliases) {
    CLOUD_PROVIDER_LOOKUP.set(normalizeProviderToken(alias), definition)
  }
}

export const CLOUD_PROVIDERS = CLOUD_PROVIDER_DEFINITIONS.map((definition) => ({ ...definition }))

export function resolveCloudProvider(input?: string | null): ResolvedCloudProvider | null {
  if (!input?.trim()) return null

  const matchedBy = normalizeProviderToken(input)
  const definition = CLOUD_PROVIDER_LOOKUP.get(matchedBy)

  if (definition) {
    return {
      ...definition,
      aliases: [...definition.aliases],
      fallbackIcon: Boolean(definition.fallbackIcon),
      matchedBy: input
    }
  }

  return {
    alias: sanitizeCustomAlias(input),
    name: input.trim(),
    icon: GENERIC_CLOUD_PROVIDER_ICON,
    aliases: [input.trim()],
    fallbackIcon: true,
    matchedBy: input,
    custom: true
  }
}
