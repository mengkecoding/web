import { defineConfig } from 'vitepress'
import markdownItVideo from "@vrcd-community/markdown-it-video"
// 为了解决找不到模块的问题，可添加类型声明来处理 SVG 导入

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小孟的技术笔记",
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
      { text: '实践', link: '/Practice/HelloWorld' },
      { text: '工具', link: '/Tools/AICoding' },
      { text: '数据结构', link: '/Code/Updata' },
      // { text: '机器学习', link: '/ML/Updata' },
      // { text: '深度学习', link: '/DL/Updata' },
       
       { text: 'Java', link: '/Java/Updata' },
       { text: 'Python', link: '/Python/Updata' },
       { text: 'Linux', link: '/Linux/Docker' },
      // { text: 'ReAct', link: '/ReAct/Updata' }
       { text: '大模型', link: '/LLM/大模型应用开发极简入门' },
    ],

    sidebar: {
      // 教程相关内容（匹配 /HelloWorld/ 和 /MyWeb/ 目录）
      '/Practice/': [
        {
          text: '后端开发实践',
          items: [
            { text: '部署HelloWorld到云服务器', link: '/Practice/HelloWorld' },
            { text: '搭建自己的技术博客', link: '/Practice/Website' } ,// 注意路径需与目录一致
            { text: '使用trae开发登录接口', link: '/Practice/AILogin' },
            { text: '低成本搭建公网可访问的本地应用', link: '/Practice/低成本搭建公网可访问的本地应用' },
            { text: 'AI编程实战：Cursor避坑指南与高效提示词设计', link: '/Practice/blog-user-service' },
          ]
        },
        {
          text: '大模型应用开发实践',
          items: [
            { text: 'Dify本地部署', link: '/Practice/dify-local-deployment-guide' },
            { text: '搭建微信公众号自动聊天机器人', link: '/Practice/搭建微信公众号自动聊天机器人' },
            { text: '文献阅读助手', link: '/Practice/文献阅读助手' },
            { text: '使用Coze搭建微信公众号聊天机器人', link: '/Practice/使用Coze搭建微信公众号聊天机器人' },
          ]
        }
      ],
      '/Tools/': [
        {
          text: '其他',
          items: [
            { text: 'AI Coding', link: '/Tools/AICoding' }, // 建议创建独立文件
            { text: '开发者平台', link: '/Tools/API' }, // 建议创建独立文件
            { text: '开源社区', link: '/Tools/Open-Source-Community' }
            // 可添加更多子项
          ]
        },
        {
          text: 'Web服务器',
          items:[

          ]
        },
        {
          text: '数据库',
          items:[

          ]
        },
        {
          text: '消息队列中间件',
          items:[

          ]
        },
        


      ],

      '/Code/': [
        {
          text: '数据结构',
          items: [
            { text: '未完待续', link: '/Code/Updata' }, // 建议创建独立文件
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
          text: '大模型基础',
          items: [
            
            
            { text: '大模型应用开发极简入门', link: '/LLM/大模型应用开发极简入门' }, // 建议创建独立文件
            { text: '大模型技术30讲', link: '/LLM/大模型技术30讲' }, // 建议创建独立文件

            // 可添加更多子项
          ]
        },
        {
          text: '提示工程',
          items:[
            { text: '提示工程基础', link: '/LLM/提示工程' },
          ]

        },
        {
          text: 'RAG',
          items:[
            { text: '正在更新中~', link: '/LLM/RAG' },
          ]

        },
        {
          text: 'Dify',
          items:[

          ]

        }
      ],
      '/Java/': [
        {
          text: 'Java',
          items: [
            { text: '未完待续', link: '/Java/Updata' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ],
      
      '/Python/': [
        {
          text: 'Python',
          items: [
            { text: '未完待续', link: '/Python/Updata' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ],
      '/Linux/': [
        {
          text: 'Linux',
          items: [
            { text: 'Docker', link: '/Linux/Docker' }, // 建议创建独立文件
            { text: 'Shell命令', link: '/Linux/Shell' }, // 建议创建独立文件
            // 可添加更多子项
          ]
        }
      ],
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
    footer: {
      copyright: "Copyright © 2025 孟柯coding | <a href='https://beian.miit.gov.cn' target='_blank'>辽ICP备2025056581号</a>"
    },

    socialLinks: [
      
      { icon: 'github', link: 'https://github.com/mengkecoding' }
      
    ]
  }
})
