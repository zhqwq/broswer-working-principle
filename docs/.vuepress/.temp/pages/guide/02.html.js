export const data = {
  "key": "v-225ad1ab",
  "path": "/guide/02.html",
  "title": "02 | TCP协议：如何保证页面文件能被完整送达浏览器？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "02 | TCP协议：如何保证页面文件能被完整送达浏览器？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一个数据包的“旅程”",
      "slug": "一个数据包的-旅程",
      "children": [
        {
          "level": 3,
          "title": "1. IP：把数据包送达目的主机",
          "slug": "_1-ip-把数据包送达目的主机",
          "children": []
        },
        {
          "level": 3,
          "title": "2. UDP：把数据包送达应用程序",
          "slug": "_2-udp-把数据包送达应用程序",
          "children": []
        },
        {
          "level": 3,
          "title": "3. TCP：把数据完整地送达应用程序",
          "slug": "_3-tcp-把数据完整地送达应用程序",
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
  "filePathRelative": "guide/02.md"
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
