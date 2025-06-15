import { defineConfig } from 'vitepress'
import markdownItVideo from "@vrcd-community/markdown-it-video"
// 为了解决找不到模块的问题，可添加类型声明来处理 SVG 导入

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "孟柯的技术笔记",
  description: "A VitePress Site",
  lang: 'zh-CN', // 设置默认语言为中文
base: '/web',
  markdown: {
    config: (md) => {
        md.use(markdownItVideo, {
            youtube: {width: '100%', height: '387px'},
            bilibili: {width: '100%', height: '387px'}
        });
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: '目录',
      level: 'deep', // 显示所有层级（h2~h6）
    },
    
    nav: [
      { text: '主页', link: '/' },
      { text: '实践', link: '/Practice/HelloWorld/HelloWorld' },
      { text: '工具', link: '/Tools/Updata' },
      // { text: '机器学习', link: '/ML/Updata' },
      // { text: '深度学习', link: '/DL/Updata' },
       { text: '大模型', link: '/LLM/Updata' },
       { text: 'Java', link: '/Java/Updata' },
      // { text: 'Python', link: '/Python/Updata' },
      // { text: 'Linux', link: '/Linux/Updata' },
      // { text: 'ReAct', link: '/ReAct/Updata' }
    ],

    sidebar: {
      // 教程相关内容（匹配 /HelloWorld/ 和 /MyWeb/ 目录）
      '/Practice/': [
        {
          text: '实践',
          items: [
            { text: '部署HelloWorld到云服务器', link: '/Practice/HelloWorld/HelloWorld' },
            { text: '搭建自己的技术博客', link: '/Practice/MyWeb/MyWeb' } ,// 注意路径需与目录一致
            { text: '使用trae开发登录接口', link: '/Practice/model/loginmodel' }
          ]
        }
      ],
      '/Tools/': [
        {
          text: '工具',
          items: [
            { text: '未完待续', link: '/Tools/Updata' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ],
      // '/ML/': [
      //   {
      //     text: '机器学习',
      //     items: [
      //       { text: '未完待续', link: '/ML/Updata' }, // 建议创建独立文件
      //       // 可添加更多子项
      //     ]
      //   }
      // ],
      // '/DL/': [
      //   {
      //     text: '深度学习',
      //     items: [
      //       { text: '未完待续', link: '/DL/Updata' }, // 建议创建独立文件
      //       // 可添加更多子项
      //     ]
      //   }
      // ],
      '/LLM/': [
        {
          text: '大模型',
          items: [
            { text: '未完待续', link: '/LLM/Updata' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ],
      '/Java/': [
        {
          text: 'Java',
          items: [
            { text: '未完待续', link: '/java/Updata' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ]
      
      // '/Python/': [
      //   {
      //     text: 'Python',
      //     items: [
      //       { text: '未完待续', link: '/Python/Updata' }, // 建议创建独立文件
      //       // 可添加更多子项
      //     ]
      //   }
      // ],
      // '/Linux/': [
      //   {
      //     text: 'Linux',
      //     items: [
      //       { text: '未完待续', link: '/Linux/Updata' }, // 建议创建独立文件
      //       // 可添加更多子项
      //     ]
      //   }
      // ],
      // '/ReAct/': [
      //   {
      //     text: 'ReAct',
      //     items: [
      //       { text: '未完待续', link: '/ReAct/Updata' }, // 建议创建独立文件
      //       // 可添加更多子项
      //     ]
      //   }
      // ]
      
    },
    

    socialLinks: [
      
      { icon: 'github', link: 'https://github.com/mengkecoding' }
      
    ]
  }
})
