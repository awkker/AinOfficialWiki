# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Embedded Slidev Presentation

You can embed interactive presentations created with Slidev directly in VitePress using `iframe`. This example demonstrates a seamless integration:
<!-- 替换为你的 Slidev 地址（本地预览/线上部署域名） -->
<!-- width,height,适配文档页面高度，比默认增加 20% 提升可视区域 -->
<!-- frameborder="0",隐藏边框，与文档风格融合 -->
 <!-- scrolling="no"禁用 iframe 内部滚动，避免与页面滚动冲突 -->
 <!--  style增加轻微阴影和圆角，匹配 VitePress 轻量设计风格 -->
  <!-- title="Slidev Demo: Markdown Extensions in Action" 明确标题，提升无障碍性 -->
  <!-- allow="fullscreen" 和 allowfullscreen 允许全屏显示 -->
<iframe 
  src="http://localhost:3030"    
  width="100%" 
  height="720"    
  frameborder="0"  
  scrolling="yes" 
  allow="fullscreen"
  allowfullscreen
  style="border-radius: 6px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);"  
  title="Slidev Demo: Markdown Extensions in Action" 
></iframe>
## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
