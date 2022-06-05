export const data = {
  "key": "v-771196a8",
  "path": "/guide/34.html",
  "title": "34 | CSRF攻击：陌生链接不要随便点",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "34 | CSRF攻击：陌生链接不要随便点"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "什么是 CSRF 攻击",
      "slug": "什么是-csrf-攻击",
      "children": [
        {
          "level": 3,
          "title": "1. 自动发起 Get 请求",
          "slug": "_1-自动发起-get-请求",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 自动发起 POST 请求",
          "slug": "_2-自动发起-post-请求",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 引诱用户点击链接",
          "slug": "_3-引诱用户点击链接",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "如何防止 CSRF 攻击",
      "slug": "如何防止-csrf-攻击",
      "children": [
        {
          "level": 3,
          "title": "1. 充分利用好 Cookie 的 SameSite 属性",
          "slug": "_1-充分利用好-cookie-的-samesite-属性",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 验证请求的来源站点",
          "slug": "_2-验证请求的来源站点",
          "children": []
        },
        {
          "level": 3,
          "title": "3. CSRF Token",
          "slug": "_3-csrf-token",
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
      "title": "思考题",
      "slug": "思考题",
      "children": []
    },
    {
      "level": 2,
      "title": "精选评论",
      "slug": "精选评论",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1652667706000,
    "contributors": [
      {
        "name": "Zhang Kaiwei",
        "email": "kaiwei.zh@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/34.md"
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
