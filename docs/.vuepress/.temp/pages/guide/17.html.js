export const data = {
  "key": "v-5fc94807",
  "path": "/guide/17.html",
  "title": "17 | WebAPI：XMLHttpRequest是怎么实现的？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "17 | WebAPI：XMLHttpRequest是怎么实现的？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "回调函数 VS 系统调用栈",
      "slug": "回调函数-vs-系统调用栈",
      "children": []
    },
    {
      "level": 2,
      "title": "XMLHttpRequest 运作机制",
      "slug": "xmlhttprequest-运作机制",
      "children": []
    },
    {
      "level": 2,
      "title": "XMLHttpRequest 使用过程中的“坑”",
      "slug": "xmlhttprequest-使用过程中的-坑",
      "children": [
        {
          "level": 3,
          "title": "1. 跨域问题",
          "slug": "_1-跨域问题",
          "children": []
        },
        {
          "level": 3,
          "title": "2. HTTPS 混合内容的问题",
          "slug": "_2-https-混合内容的问题",
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
  "git": {
    "updatedTime": 1652544035000,
    "contributors": [
      {
        "name": "Zhang Kaiwei",
        "email": "kaiwei.zh@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/17.md"
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
