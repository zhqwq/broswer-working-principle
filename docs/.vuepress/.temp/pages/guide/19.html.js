export const data = {
  "key": "v-6332f945",
  "path": "/guide/19.html",
  "title": "19 | Promise：使用Promise，告别回调函数",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "19 | Promise：使用Promise，告别回调函数"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "异步编程的问题：代码逻辑不连续",
      "slug": "异步编程的问题-代码逻辑不连续",
      "children": []
    },
    {
      "level": 2,
      "title": "封装异步代码，让处理流程变得线性",
      "slug": "封装异步代码-让处理流程变得线性",
      "children": []
    },
    {
      "level": 2,
      "title": "新的问题：回调地狱",
      "slug": "新的问题-回调地狱",
      "children": []
    },
    {
      "level": 2,
      "title": "Promise：消灭嵌套调用和多次错误处理",
      "slug": "promise-消灭嵌套调用和多次错误处理",
      "children": []
    },
    {
      "level": 2,
      "title": "Promise 与微任务",
      "slug": "promise-与微任务",
      "children": []
    },
    {
      "level": 2,
      "title": "总结",
      "slug": "总结",
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
  "filePathRelative": "guide/19.md"
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
