import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ router }) {
    // 当访问根路径时，重定向到文档页面
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = (to) => {
        if (to === '/') {
          window.location.href = '/guide/'
        }
      }
    }
  }
} 