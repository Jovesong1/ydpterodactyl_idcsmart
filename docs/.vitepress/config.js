import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '模块文档',
  description: '模块文档详细说明',
  base: '/ydpterodactyl_idcsmart/', // 仓库名
  // 设置直接跳转到文档页面，而不是index
  cleanUrls: true,
  
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '文档', link: '/guide/' }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '基本用法', link: '/guide/basic-usage' }
          ]
        },
        {
          text: '高级',
          items: [
            { text: '高级功能', link: '/guide/advanced' },
            { text: 'API参考', link: '/guide/api' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/your-repo' }
    ]
  }
}) 