import type { IconifyIcon } from '@iconify/types'
import { getIconData, iconToSVG } from '@iconify/utils'
import { LOCAL_ICON_COLLECTIONS } from '../../generated/local-icons'

const ICON_SET_BY_PREFIX = new Map(LOCAL_ICON_COLLECTIONS.map((iconSet) => [iconSet.prefix, iconSet]))

function parseIconName(iconName: string) {
  const [prefix, ...rest] = iconName.split(':')
  const name = rest.join(':')

  if (!prefix || !name) return null

  return { prefix, name }
}

export function resolveLocalIconData(iconName: string): IconifyIcon | null {
  const parsed = parseIconName(iconName)
  if (!parsed) return null

  const iconSet = ICON_SET_BY_PREFIX.get(parsed.prefix)
  if (!iconSet) return null

  return getIconData(iconSet, parsed.name)
}

export function buildLocalIconMarkup(iconName: string, width = 16, height = 16): string {
  const icon = resolveLocalIconData(iconName)
  if (!icon) return ''

  const built = iconToSVG(icon, { width, height })
  const attributes = Object.entries(built.attributes)
    .map(([key, value]) => `${key}="${String(value)}"`)
    .join(' ')

  return `<svg xmlns="http://www.w3.org/2000/svg" ${attributes} aria-hidden="true">${built.body}</svg>`
}
