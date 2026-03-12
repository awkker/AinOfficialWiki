---
title: Slidev 教程总览：主题、独立访问与文档嵌入
description: 面向本项目的 Slidev 使用指南，集中介绍仓库内主题的启用方式、 deck 独立访问地址、在 VitePress 中嵌入幻灯片的方法，以及 Cloudflare Pages 下的联合部署阅读路径。
outline: deep
---

# Slidev 教程总览

这一组文档不是单讲 Slidev 官方功能，而是围绕本仓库的实际结构来写：

- `slides/` 放真实的 Slidev 源文件
- `docs/slides/` 放文档站中的嵌入页
- `.cloudflare-dist/decks/主题名/` 放每个 deck 的独立构建产物

<Aside type="tip" title="推荐阅读顺序">
  先看主题如何启用，再看 deck 如何独立访问，最后看如何嵌入到文档页中。这样阅读时更容易把源码、访问地址和部署产物对上。
</Aside>

## 阅读入口

<LinkCard
  title="项目主题使用"
  href="/resource/project-slidev/theme"
  description="了解本仓库的本地 Slidev 主题目录、主题文件职责，以及如何在 deck 中启用。"
  icon="mdi:palette-swatch-outline"
  badge="先读"
/>

<LinkCard
  title="Slidev 独立访问链接"
  href="/resource/project-slidev/standalone-access"
  description="分清开发地址、文档页地址和生产环境下的 /decks/专题名/ 独立访问链接。"
  icon="mdi:link-variant"
  badge="核心"
/>

<LinkCard
  title="嵌入到文档中"
  href="/resource/project-slidev/embed-in-docs"
  description="学习如何在 docs/slides 页面中通过 SlideEmbed 组件嵌入 deck，而不是直接写原始 iframe。"
  icon="mdi:application-braces-outline"
/>

<LinkCard
  title="Cloudflare Pages 部署延伸阅读"
  href="https://hs.cnies.org/archives/vitepress-slidev-intergration-on-cloudflare"
  description="阅读 VitePress + Slidev 单 Pages 方案，理解为什么本仓库把文档站和 deck 产物合并到同一输出目录。"
  icon="mdi:cloud-outline"
  badge="外部文章"
/>

## 三类地址要分清

| 地址类型 | 示例 | 用途 |
| --- | --- | --- |
| 文档页 | `/slides/demo` | 在 VitePress 内查看说明和嵌入版 deck |
| 独立 deck | `/decks/demo/` | 直接打开构建后的 Slidev 单页应用 |
| 本地开发端口 | `http://localhost:3030/` | 仅开发时使用，不能写进文档源码 |

## 快速定位仓库文件

```text
docs/
  slides/                # 文档站里的嵌入页
  resource/project-slidev/  # 这组教程文档
slides/
  demo.md
  2025-guide.md
  theme-ain/             # 本项目的本地 Slidev 主题
```

## 继续阅读

- [项目主题使用](/resource/project-slidev/theme)
- [Slidev 独立访问链接](/resource/project-slidev/standalone-access)
- [嵌入到文档中](/resource/project-slidev/embed-in-docs)
