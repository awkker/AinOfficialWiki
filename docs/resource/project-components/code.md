---
title: Code 组件
outline: deep
description: 使用 Code 组件展示代码块，支持语言主题、文件路径和一键复制。
---

# Code 组件

`Code` 用于展示代码片段，并支持：

- 按 `lang` 显示语言标签和配色（窄屏自动缩写）。
- 按 `path` 显示文件路径。
- 标题栏一键复制代码（统一 Toast 反馈）。
- markdown 原生代码块自动套用同一套样式与复制按钮。

## 显示规则

1. markdown 原生代码块：语言显示在左侧。
2. `Code` 未传 `path`：语言显示在左侧。
3. `Code` 传入 `path`：语言显示在复制按钮左侧。
4. 最左侧始终显示当前语言 icon（Iconify）。
5. 竖屏或路径过长（`>70`）时，语言标签自动切换缩写。

## 基础用法

<Code
  lang="ts"
  path="src/components/link-card.ts"
>
export function createCard(title: string, href: string) {
  return { title, href }
}
</Code>

```md
<Code
  lang="ts"
  path="src/components/link-card.ts"
>
export function createCard(title: string, href: string) {
  return { title, href }
}
</Code>
```

## 使用默认插槽传代码

<Code lang="py" path="scripts/math.py">
def add(a: int, b: int) -> int:
    return a + b
</Code>

```md
<Code lang="py" path="scripts/math.py">
def add(a: int, b: int) -> int:
    return a + b
</Code>
```

## markdown 原生代码块（同样样式）

```ts
export function createCard(title: string, href: string) {
  return { title, href }
}
```

````md
```ts
export function createCard(title: string, href: string) {
  return { title, href }
}
```
````

## 自动换行与自定义强调色

<Code
  lang="json"
  path="config/site.json"
  :wrap="true"
  color="#00a7b7"
>
{
  "title": "Demo",
  "description": "A long text for wrapping demo with automatic line wrapping enabled"
}
</Code>

## 隐藏行号与禁用复制

<Code lang="ts" :hide-line-numbers="true" :disable-copy="true">
const status = 'display-only'
console.log(status)
</Code>

## Props

| 参数 | 类型 | 默认值 | 说明 | 示例 |
| --- | --- | --- | --- | --- |
| `lang` | `string` | `text` | 语言标识，会影响标签和强调色。 | `lang="ts"` |
| `path` | `string` | `''` | 显示文件路径。 | `path="src/utils/math.ts"` |
| `title` | `string` | `''` | 未传 `path` 时可用作标题。 | `title="示例代码"` |
| `code` | `string` | `''` | 代码文本；不传则读取默认插槽。 | `:code="'const sum = 1 + 2'"` |
| `icon` | `string` | `''` | 覆盖默认语言图标。 | `icon="mdi:code-tags"` |
| `wrap` | `boolean` | `false` | 是否自动换行。 | `:wrap="true"` |
| `color` | `string` | `''` | 自定义强调色。 | `color="#00a7b7"` |
| `hideLineNumbers` | `boolean` | `false` | 隐藏左侧行号。 | `:hide-line-numbers="true"` |
| `disableCopy` | `boolean` | `false` | 隐藏复制按钮并禁用复制行为。 | `:disable-copy="true"` |
