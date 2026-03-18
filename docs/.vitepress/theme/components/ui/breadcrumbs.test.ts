import { describe, expect, test } from 'bun:test'
import { collapseBreadcrumbItems, type BreadcrumbItem } from './breadcrumbs'

function makeItems(labels: string[]): BreadcrumbItem[] {
  return labels.map((text, index) => ({
    key: `${index}-${text}`,
    text,
    href: index === labels.length - 1 ? undefined : `/${text.toLowerCase()}`,
    current: index === labels.length - 1
  }))
}

describe('collapseBreadcrumbItems', () => {
  test('keeps all items in full mode', () => {
    const items = makeItems(['首页', '指南', '组件', 'Breadcrumbs'])

    expect(collapseBreadcrumbItems(items, 'full')).toEqual([
      { kind: 'item', ...items[0] },
      { kind: 'item', ...items[1] },
      { kind: 'item', ...items[2] },
      { kind: 'item', ...items[3] }
    ])
  })

  test('preserves the first item and the last three visible slots in tail-2 mode', () => {
    const items = makeItems(['首页', '资源', '项目组件', '交互组件', '浮层与提示', 'Popover'])

    expect(collapseBreadcrumbItems(items, 'tail-2')).toEqual([
      { kind: 'item', ...items[0] },
      { kind: 'ellipsis', key: 'ellipsis', hiddenItems: [items[1], items[2]] },
      { kind: 'item', ...items[3] },
      { kind: 'item', ...items[4] },
      { kind: 'item', ...items[5] }
    ])
  })

  test('preserves only the root and current items in root-current mode', () => {
    const items = makeItems(['首页', '资源', '项目组件', '交互组件', 'Popover'])

    expect(collapseBreadcrumbItems(items, 'root-current')).toEqual([
      { kind: 'item', ...items[0] },
      { kind: 'ellipsis', key: 'ellipsis', hiddenItems: [items[1], items[2], items[3]] },
      { kind: 'item', ...items[4] }
    ])
  })

  test('skips collapsing when the trail is already short enough for the chosen mode', () => {
    const items = makeItems(['首页', '资源', 'Popover'])

    expect(collapseBreadcrumbItems(items, 'root-current')).toEqual([
      { kind: 'item', ...items[0] },
      { kind: 'item', ...items[1] },
      { kind: 'item', ...items[2] }
    ])
  })
})
