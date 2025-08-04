# 模块文档

这是一个基于VitePress构建的模块文档项目。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

## 构建

```bash
# 构建静态网站
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 文档结构

- `docs/guide/` - 文档主要内容
  - `index.md` - 介绍页面
  - `getting-started.md` - 快速开始
  - `basic-usage.md` - 基本用法
  - `advanced.md` - 高级功能
  - `api.md` - API参考

## 自定义

你可以编辑 `docs/.vitepress/config.js` 文件来自定义VitePress配置。 