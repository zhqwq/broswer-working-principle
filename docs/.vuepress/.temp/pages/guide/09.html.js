export const data = {
  "key": "v-2e4cbe04",
  "path": "/guide/09.html",
  "title": "09 | 块级作用域：var缺陷以及为什么要引入let和const？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "09 | 块级作用域：var缺陷以及为什么要引入let和const？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "作用域（scope）",
      "slug": "作用域-scope",
      "children": []
    },
    {
      "level": 2,
      "title": "变量提升所带来的问题",
      "slug": "变量提升所带来的问题",
      "children": [
        {
          "level": 3,
          "title": "1. 变量容易在不被察觉的情况下被覆盖掉",
          "slug": "_1-变量容易在不被察觉的情况下被覆盖掉",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 本应销毁的变量没有被销毁",
          "slug": "_2-本应销毁的变量没有被销毁",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "ES6 是如何解决变量提升带来的缺陷",
      "slug": "es6-是如何解决变量提升带来的缺陷",
      "children": []
    },
    {
      "level": 2,
      "title": "JavaScript 是如何支持块级作用域的",
      "slug": "javascript-是如何支持块级作用域的",
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
  "filePathRelative": "guide/09.md"
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
