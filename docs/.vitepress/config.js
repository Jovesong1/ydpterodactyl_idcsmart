import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '翼龙对接魔方财务模块(集成版)',
  description: '模块文档详细说明',
  base: '/', // 与仓库名保持一致
  cleanUrls: true,
  
  // 新增：构建选项确保生成正确的 HTML 文件
  build: {
    outDir: '../dist', // 明确输出目录（默认就是这个，显式声明更清晰）
    emptyOutDir: true // 每次构建清空输出目录，避免旧文件干扰
  },
  
  themeConfig: {
    nav: [
      { text: '文档', link: '/' }
    ],
    
    sidebar: {
      '/': [
        {
          text: '项目',
          items: [
            { text: '介绍', link: '/' },
            {
              text: '快速开始',
              items: [
                { text: '安装翼龙', link: '/install-pterodactyl' },
                { text: '模块安装', link: '/install-module' },
                { text: '配置接口', link: '/setup-api' }
              ]
            },
            {
              text: '功能配置',
              items: [
                {
                  text: '魔方相关',
                  items: [
                    { text: '开通配置项', link: '/idcsmart-activate' },
                    { text: '产品配置项', link: '/idcsmart-product' },
                    { text: '升降级', link: '/idcsmart-upgrade' }
                  ]
                },
                {
                  text: '翼龙相关',
                  items: [
                    { text: 'wings', link: '/wings' },
                    { text: '前端数据库', link: '/pterodactyl-database' }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: '问题解答',
          items: [
            { text: '常见问题', link: '/faq' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jovesong1/ydpterodactyl_idcsmart' }
    ],
    
    // 新增：404 页面配置（可选）
    notFound: {
      title: '页面未找到',
      subtitle: '请检查您访问的链接是否正确',
      linkText: '返回首页'
    }
  }
})
