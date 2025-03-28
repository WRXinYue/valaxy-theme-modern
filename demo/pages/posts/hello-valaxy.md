---
title: Hello, Valaxy!
date: 2022-03-22
updated: 2022-03-23
categories: Valaxy Notes
tags:
  - valaxy
  - 笔记
---

欢迎使用 Valaxy 博客框架！这是一个入门示例文章，展示了如何使用 Valaxy 创建博客。文章包含简单的 Markdown 格式示例以及 Valaxy 主题配置的代码片段。

<!-- more -->

## Hello, Valaxy!

English

**English Bold**

```ts
import type { ThemeConfig } from 'valaxy-theme-modern'
import { defineConfig } from 'valaxy'

export default defineConfig<ThemeConfig>({
  // your theme name
  // valaxy-theme-yun name is 'yun'
  theme: 'starter',

  themeConfig: {
    banner: {
      enable: true,
      title: '云游君的小站',
    },
  },
})
```
