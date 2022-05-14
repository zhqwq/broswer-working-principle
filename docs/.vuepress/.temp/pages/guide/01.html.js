export const data = {
  "key": "v-20a5f90c",
  "path": "/guide/01.html",
  "title": "01 | Chrome架构：仅仅打开了1个页面，为什么有4个进程？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "01 | Chrome架构：仅仅打开了1个页面，为什么有4个进程？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "进程和线程",
      "slug": "进程和线程",
      "children": []
    },
    {
      "level": 2,
      "title": "什么是并行处理",
      "slug": "什么是并行处理",
      "children": []
    },
    {
      "level": 2,
      "title": "线程 VS 进程",
      "slug": "线程-vs-进程",
      "children": []
    },
    {
      "level": 2,
      "title": "单进程浏览器时代",
      "slug": "单进程浏览器时代",
      "children": [
        {
          "level": 3,
          "title": "问题 1：不稳定",
          "slug": "问题-1-不稳定",
          "children": []
        },
        {
          "level": 3,
          "title": "问题 2：不流畅",
          "slug": "问题-2-不流畅",
          "children": []
        },
        {
          "level": 3,
          "title": "问题 3：不安全",
          "slug": "问题-3-不安全",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "多进程浏览器时代",
      "slug": "多进程浏览器时代",
      "children": []
    },
    {
      "level": 2,
      "title": "早期多进程架构",
      "slug": "早期多进程架构",
      "children": []
    },
    {
      "level": 2,
      "title": "目前多进程架构",
      "slug": "目前多进程架构",
      "children": []
    },
    {
      "level": 2,
      "title": "未来面向服务的架构",
      "slug": "未来面向服务的架构",
      "children": []
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
  "filePathRelative": "guide/01.md"
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
