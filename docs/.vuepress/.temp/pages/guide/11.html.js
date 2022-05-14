export const data = {
  "key": "v-558c344d",
  "path": "/guide/11.html",
  "title": "11 | this：从JavaScript执行上下文的视角讲清楚this",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "11 | this：从JavaScript执行上下文的视角讲清楚this"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "JavaScript 中的 this 是什么",
      "slug": "javascript-中的-this-是什么",
      "children": []
    },
    {
      "level": 2,
      "title": "全局执行上下文中的 this",
      "slug": "全局执行上下文中的-this",
      "children": []
    },
    {
      "level": 2,
      "title": "函数执行上下文中的 this",
      "slug": "函数执行上下文中的-this",
      "children": [
        {
          "level": 3,
          "title": "1. 通过函数的 call 方法设置",
          "slug": "_1-通过函数的-call-方法设置",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 通过对象调用方法设置",
          "slug": "_2-通过对象调用方法设置",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 通过构造函数中设置",
          "slug": "_3-通过构造函数中设置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "this 的设计缺陷以及应对方案",
      "slug": "this-的设计缺陷以及应对方案",
      "children": [
        {
          "level": 3,
          "title": "1. 嵌套函数中的 this 不会从外层函数中继承",
          "slug": "_1-嵌套函数中的-this-不会从外层函数中继承",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 普通函数中的 this 默认指向全局对象 window",
          "slug": "_2-普通函数中的-this-默认指向全局对象-window",
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
  "filePathRelative": "guide/11.md"
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
