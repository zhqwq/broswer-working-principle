export const data = {
  "key": "v-240faa4a",
  "path": "/guide/03.html",
  "title": "03 | HTTP请求流程：为什么很多站点第二次打开速度会很快？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "03 | HTTP请求流程：为什么很多站点第二次打开速度会很快？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "浏览器端发起 HTTP 请求流程",
      "slug": "浏览器端发起-http-请求流程",
      "children": [
        {
          "level": 3,
          "title": "1. 构建请求",
          "slug": "_1-构建请求",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 查找缓存",
          "slug": "_2-查找缓存",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 准备 IP 地址和端口",
          "slug": "_3-准备-ip-地址和端口",
          "children": []
        },
        {
          "level": 3,
          "title": "4. 等待 TCP 队列",
          "slug": "_4-等待-tcp-队列",
          "children": []
        },
        {
          "level": 3,
          "title": "5. 建立 TCP 连接",
          "slug": "_5-建立-tcp-连接",
          "children": []
        },
        {
          "level": 3,
          "title": "6. 发送 HTTP 请求",
          "slug": "_6-发送-http-请求",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务器端处理 HTTP 请求流程",
      "slug": "服务器端处理-http-请求流程",
      "children": [
        {
          "level": 3,
          "title": "1. 返回请求",
          "slug": "_1-返回请求",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 断开连接",
          "slug": "_2-断开连接",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 重定向",
          "slug": "_3-重定向",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "问题解答",
      "slug": "问题解答",
      "children": [
        {
          "level": 3,
          "title": "1. 为什么很多站点第二次打开速度会很快？",
          "slug": "_1-为什么很多站点第二次打开速度会很快",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 登录状态是如何保持的？",
          "slug": "_2-登录状态是如何保持的",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "总结",
      "slug": "总结",
      "children": []
    },
    {
      "level": 2,
      "title": "思考时间",
      "slug": "思考时间",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "guide/03.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
