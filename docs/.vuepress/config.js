const { defaultTheme } = require('vuepress')
// 配置信息
module.exports = {
  lang: 'zh-CN',
  title: '浏览器工作原理与实践',
  description: '浏览器工作原理与实践 - 李兵',
  base: '/broswer-working-principle/',
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '指南',
        link: '/guide/intro'
      }
    ],
    sidebar: [
      // SidebarItem
      {
        text: '开篇词 (1讲)',
        children: [
          {
            text: '开篇词 | 参透了浏览器的工作原理, 你就能解决80%的前端难题',
            link: '/guide/intro'
          }
        ]
      },
      {
        text: '宏观视角下的浏览器 (6讲)',
        children: [
          {
            text: '01 | Chrome架构: 仅仅打开了1个页面, 为什么有4个进程',
            link: '/guide/01'
          },
          {
            text: '02 | TCP协议: 如何保证页面文件能被完整送达浏览器?',
            link: '/guide/02'
          },
          {
            text: '03 | HTTP请求流程: 为什么很多站点第二次打开速度会很快?',
            link: '/guide/03'
          },
          {
            text: '04 | 导航流程: 从输入URL到页面展示, 这中间发生了什么?',
            link: '/guide/04'
          },
          {
            text: '05 | 渲染流程(上): HTML、CSS和JavaScript, 是如何变成页面的?',
            link: '/guide/05'
          },
          {
            text: '06 | 渲染流程(下): HTML、CSS和JavaScript, 是如何变成页面的?',
            link: '/guide/06'
          }
        ]
      },
      {
        text: '浏览器中的JavaScript执行机制 (5讲)',
        children: [
          {
            text: '07 | 变量提升: JavaScript代码是按顺序执行的吗?',
            link: '/guide/07'
          },
          {
            text: '08 | 调用栈: 为什么JavaScript代码会出现栈溢出?',
            link: '/guide/08'
          },
          {
            text: '09 | 块级作用域: var缺陷以及为什么要引入let和const?',
            link: '/guide/09'
          },
          {
            text: '10 | 作用域链和闭包: 代码中出现相同的变量,JavaScript引擎是如何选择的?',
            link: '/guide/10'
          },
          {
            text: '11 | this: 从JavaScript执行上下文的视角讲清楚this',
            link: '/guide/11'
          }
        ]
      },
      {
        text: 'V8工作原理 (3讲)',
        children: [
          {
            text: '12 | 栈空间和堆空间：数据是如何存储的？',
            link: '/guide/12'
          },
          {
            text: '13 | 垃圾回收：垃圾数据是如何自动回收的？',
            link: '/guide/13'
          },
          {
            text: '14 | 编译器和解释器: V8是如何执行一段JavaScript代码的?',
            link: '/guide/14'
          }
        ]
      },
      {
        text: '浏览器中的页面循环系统 (6讲)',
        children: [
          {
            text: '15 | 消息队列和事件循环：页面是怎么“活”起来的？',
            link: '/guide/15'
          },
          {
            text: '16 | WebAPI: setTimeout是如何实现的?',
            link: '/guide/16'
          },
          {
            text: '17 | WebAPI: XMLHttpRequest是怎么实现的?',
            link: '/guide/17'
          },
          {
            text: '18 | 宏任务和微任务：不是所有任务都是一个待遇',
            link: '/guide/18'
          },
          {
            text: '18 | 宏任务和微任务：不是所有任务都是一个待遇',
            link: '/guide/18'
          },
          {
            text: '19 | Promise: 使用Promise, 告别回调函数',
            link: '/guide/19'
          },
          {
            text: '20 | async/await: 使用同步的方式去写异步代码',
            link: '/guide/20'
          }
        ]
      },
      {
        text: '浏览器中的页面 (8讲)',
        children: [
          {
            text: '21 | Chrome开发者工具: 利用网络面板做性能分析',
            link: '/guide/21'
          },
          {
            text: '22 | DOM树: JavaScript是如何影响DOM树构建的?',
            link: '/guide/22'
          },
          {
            text: '23 | 渲染流水线: CSS如何影响首次加载时的白屏时间?',
            link: '/guide/23'
          },
          {
            text: '24 | 分层和合成机制: 为什么CSS动画比JavaScript高效?',
            link: '/guide/24'
          },
          {
            text: '25 | 页面性能：如何系统地优化页面？',
            link: '/guide/25'
          },
          {
            text: '26 | 虚拟DOM: 虚拟DOM和实际的DOM有何不同?',
            link: '/guide/26'
          },
          {
            text: '27 | 渐进式网页应用(PWA): 它究竟解决了Web应用的哪些问题?',
            link: '/guide/27'
          },
          {
            text: '28 | WebComponent: 像搭积木一样构建Web应用',
            link: '/guide/28'
          }
        ]
      },
      {
        text: '浏览器中的网络 (3讲)',
        children: [
          {
            text: '29 | HTTP/1: HTTP性能优化',
            link: '/guide/29'
          },
          {
            text: '30 | HTTP/2: 如何提升网络速度？',
            link: '/guide/30'
          },
          {
            text: '31|HTTP/3:甩掉TCP、TLS 的包袱，构建高效网络',
            link: '/guide/31'
          }
        ]
      },
      {
        text: '浏览器安全 (5讲)',
        children: [
          {
            text: '32 | 同源策略: 为什么XMLHttpRequest不能跨域请求资源?',
            link: '/guide/32'
          },
          {
            text: '33 | 跨站脚本攻击(XSS): 为什么Cookie中有HttpOnly属性?',
            link: '/guide/33'
          },
          {
            text: '34 | CSRF攻击: 陌生链接不要随便点',
            link: '/guide/34'
          },
          {
            text: '35 | 安全沙箱：页面和系统之间的隔离墙',
            link: '/guide/35'
          },
          {
            text: '36 | HTTPS: 让数据传输更安全',
            link: '/guide/36'
          }
        ]
      },
      {
        text: '结束语 (3讲)',
        children: [
          {
            text: '结束语 | 大道至简',
            link: '/guide/end'
          }
        ]
      },
      {
        text: '课外加餐 (6讲)',
        children: [
          {
            text: '加餐一｜浏览上下文组：如何计算Chrome中渲染进程的个数？',
            link: '/guide/extra-1'
          },
          {
            text: '加餐二｜任务调度：有了setTimeOut，为什么还要使用rAF？',
            link: '/guide/extra-2'
          },
          {
            text: '加餐三｜加载阶段性能：使用Audits来优化Web性能',
            link: '/guide/extra-3'
          },
          {
            text: '加餐四｜页面性能工具：如何使用Performance？',
            link: '/guide/extra-4'
          },
          {
            text: '加餐五 | 性能分析工具：如何分析Performance中的Main指标？',
            link: '/guide/extra-5'
          },
          {
            text: '加餐六｜HTTPS：浏览器如何验证数字证书？',
            link: '/guide/extra-6'
          },

        ]
      }
    ]
  })
}
