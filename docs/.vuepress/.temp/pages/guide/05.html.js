export const data = {
  "key": "v-27795b88",
  "path": "/guide/05.html",
  "title": "05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "构建 DOM 树",
      "slug": "构建-dom-树",
      "children": []
    },
    {
      "level": 2,
      "title": "样式计算（Recalculate Style）",
      "slug": "样式计算-recalculate-style",
      "children": [
        {
          "level": 3,
          "title": "1. 把 CSS 转换为浏览器能够理解的结构",
          "slug": "_1-把-css-转换为浏览器能够理解的结构",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 转换样式表中的属性值，使其标准化",
          "slug": "_2-转换样式表中的属性值-使其标准化",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 计算出 DOM 树中每个节点的具体样式",
          "slug": "_3-计算出-dom-树中每个节点的具体样式",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "布局阶段",
      "slug": "布局阶段",
      "children": [
        {
          "level": 3,
          "title": "1. 创建布局树",
          "slug": "_1-创建布局树",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 布局计算",
          "slug": "_2-布局计算",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "总结",
      "slug": "总结",
      "children": [
        {
          "level": 3,
          "title": "思考时间",
          "slug": "思考时间",
          "children": []
        }
      ]
    }
  ],
  "git": {},
  "filePathRelative": "guide/05.md"
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
