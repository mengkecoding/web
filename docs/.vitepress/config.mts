import { defineConfig } from 'vitepress'
// 为了解决找不到模块的问题，可添加类型声明来处理 SVG 导入

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "孟柯的技术笔记",
  description: "A VitePress Site",
  lang: 'zh-CN', // 设置默认语言为中文
  base: '/web/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: '目录',
      level: 'deep', // 显示所有层级（h2~h6）
    },
    
    nav: [
      { text: '主页', link: '/' },
      { text: '笔记', link: '/HelloWorld/HelloWorld' }
    ],

    sidebar: [
      {
        text: '教程',
        items: [
          { text: '部署HelloWorld到云服务器', link: 'HelloWorld/HelloWorld' },
          { text: '搭建自己的技术博客', link: '/MyWeb/MyWeb' }
        ]
      }
    ],

    socialLinks: [
      
      { icon: 'github', link: 'https://github.com/mengkecoding' }
      
    ]
  }
})
