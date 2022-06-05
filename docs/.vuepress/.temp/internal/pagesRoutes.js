import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-20a5f90c","/guide/01.html",{"title":"01 | Chrome架构：仅仅打开了1个页面，为什么有4个进程？"},["/guide/01","/guide/01.md"]],
  ["v-225ad1ab","/guide/02.html",{"title":"02 | TCP协议：如何保证页面文件能被完整送达浏览器？"},["/guide/02","/guide/02.md"]],
  ["v-240faa4a","/guide/03.html",{"title":"03 | HTTP请求流程：为什么很多站点第二次打开速度会很快？"},["/guide/03","/guide/03.md"]],
  ["v-25c482e9","/guide/04.html",{"title":"04 | 导航流程：从输入URL到页面展示，这中间发生了什么？"},["/guide/04","/guide/04.md"]],
  ["v-27795b88","/guide/05.html",{"title":"05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？"},["/guide/05","/guide/05.md"]],
  ["v-292e3427","/guide/06.html",{"title":"06 | 渲染流程（下）：HTML、CSS和JavaScript，是如何变成页面的？"},["/guide/06","/guide/06.md"]],
  ["v-2ae30cc6","/guide/07.html",{"title":"07 | 变量提升：JavaScript代码是按顺序执行的吗？"},["/guide/07","/guide/07.md"]],
  ["v-2c97e565","/guide/08.html",{"title":"08 | 调用栈：为什么JavaScript代码会出现栈溢出？"},["/guide/08","/guide/08.md"]],
  ["v-2e4cbe04","/guide/09.html",{"title":"09 | 块级作用域：var缺陷以及为什么要引入let和const？"},["/guide/09","/guide/09.md"]],
  ["v-53d75bae","/guide/10.html",{"title":"10 | 作用域链和闭包 ：代码中出现相同的变量，JavaScript引擎是如何选择的？"},["/guide/10","/guide/10.md"]],
  ["v-558c344d","/guide/11.html",{"title":"11 | this：从JavaScript执行上下文的视角讲清楚this"},["/guide/11","/guide/11.md"]],
  ["v-57410cec","/guide/12.html",{"title":"12 | 栈空间和堆空间：数据是如何存储的？"},["/guide/12","/guide/12.md"]],
  ["v-58f5e58b","/guide/13.html",{"title":"13 | 垃圾回收：垃圾数据是如何自动回收的？"},["/guide/13","/guide/13.md"]],
  ["v-5aaabe2a","/guide/14.html",{"title":"14 | 编译器和解释器：V8是如何执行一段JavaScript代码的？"},["/guide/14","/guide/14.md"]],
  ["v-5c5f96c9","/guide/15.html",{"title":"15 | 消息队列和事件循环：页面是怎么“活”起来的？"},["/guide/15","/guide/15.md"]],
  ["v-5e146f68","/guide/16.html",{"title":"16 | WebAPI：setTimeout是如何实现的？"},["/guide/16","/guide/16.md"]],
  ["v-5fc94807","/guide/17.html",{"title":"17 | WebAPI：XMLHttpRequest是怎么实现的？"},["/guide/17","/guide/17.md"]],
  ["v-617e20a6","/guide/18.html",{"title":"18 | 宏任务和微任务：不是所有任务都是一个待遇"},["/guide/18","/guide/18.md"]],
  ["v-6332f945","/guide/19.html",{"title":"19 | Promise：使用Promise，告别回调函数"},["/guide/19","/guide/19.md"]],
  ["v-ee84d222","/guide/20.html",{"title":"20 | async/await：使用同步的方式去写异步代码"},["/guide/20","/guide/20.md"]],
  ["v-eb1b20e4","/guide/21.html",{"title":"21 | Chrome开发者工具：利用网络面板做性能分析"},["/guide/21","/guide/21.md"]],
  ["v-e7b16fa6","/guide/22.html",{"title":"22 | DOM树：JavaScript是如何影响DOM树构建的？"},["/guide/22","/guide/22.md"]],
  ["v-e447be68","/guide/23.html",{"title":"23 | 渲染流水线：CSS如何影响首次加载时的白屏时间？"},["/guide/23","/guide/23.md"]],
  ["v-e0de0d2a","/guide/24.html",{"title":"24 | 分层和合成机制：为什么CSS动画比JavaScript高效？"},["/guide/24","/guide/24.md"]],
  ["v-dd745bec","/guide/25.html",{"title":"25 | 页面性能：如何系统地优化页面？"},["/guide/25","/guide/25.md"]],
  ["v-da0aaaae","/guide/26.html",{"title":"26 | 虚拟DOM：虚拟DOM和实际的DOM有何不同？"},["/guide/26","/guide/26.md"]],
  ["v-d6a0f970","/guide/27.html",{"title":"27 | 渐进式网页应用（PWA）：它究竟解决了Web应用的哪些问题？"},["/guide/27","/guide/27.md"]],
  ["v-d3374832","/guide/28.html",{"title":"28 | WebComponent：像搭积木一样构建Web应用"},["/guide/28","/guide/28.md"]],
  ["v-cfcd96f4","/guide/29.html",{"title":"29 | HTTP/1：HTTP性能优化"},["/guide/29","/guide/29.md"]],
  ["v-84b85ba0","/guide/30.html",{"title":"30｜HTTP/2：如何提升网络速度？"},["/guide/30","/guide/30.md"]],
  ["v-814eaa62","/guide/31.html",{"title":"31｜HTTP/3：甩掉TCP、TLS 的包袱，构建高效网络"},["/guide/31","/guide/31.md"]],
  ["v-7de4f924","/guide/32.html",{"title":"32 | 同源策略：为什么XMLHttpRequest不能跨域请求资源？"},["/guide/32","/guide/32.md"]],
  ["v-7a7b47e6","/guide/33.html",{"title":"33 | 跨站脚本攻击（XSS）：为什么Cookie中有HttpOnly属性？"},["/guide/33","/guide/33.md"]],
  ["v-771196a8","/guide/34.html",{"title":"34 | CSRF攻击：陌生链接不要随便点"},["/guide/34","/guide/34.md"]],
  ["v-73a7e56a","/guide/35.html",{"title":"35 | 安全沙箱：页面和系统之间的隔离墙"},["/guide/35","/guide/35.md"]],
  ["v-703e342c","/guide/36.html",{"title":"36 | HTTPS：让数据传输更安全"},["/guide/36","/guide/36.md"]],
  ["v-698295ca","/guide/end.html",{"title":"结束语 | 大道至简"},["/guide/end","/guide/end.md"]],
  ["v-bb37dade","/guide/extra-1.html",{"title":"加餐一｜浏览上下文组：如何计算Chrome中渲染进程的个数？"},["/guide/extra-1","/guide/extra-1.md"]],
  ["v-b7ce29a0","/guide/extra-2.html",{"title":"加餐二｜任务调度：有了setTimeOut，为什么还要使用rAF？"},["/guide/extra-2","/guide/extra-2.md"]],
  ["v-b4647862","/guide/extra-3.html",{"title":"加餐三｜加载阶段性能：使用Audits来优化Web性能"},["/guide/extra-3","/guide/extra-3.md"]],
  ["v-b0fac724","/guide/extra-4.html",{"title":"加餐四｜页面性能工具：如何使用Performance？"},["/guide/extra-4","/guide/extra-4.md"]],
  ["v-ad9115e6","/guide/extra-5.html",{"title":"加餐五 | 性能分析工具：如何分析Performance中的Main指标？"},["/guide/extra-5","/guide/extra-5.md"]],
  ["v-aa2764a8","/guide/extra-6.html",{"title":"加餐六｜HTTPS：浏览器如何验证数字证书？"},["/guide/extra-6","/guide/extra-6.md"]],
  ["v-77a9ffd9","/guide/intro.html",{"title":"开篇词 | 参透了浏览器的工作原理，你就能解决80%的前端难题"},["/guide/intro","/guide/intro.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
