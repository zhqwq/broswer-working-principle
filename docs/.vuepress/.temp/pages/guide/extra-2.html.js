export const data = {
  "key": "v-b7ce29a0",
  "path": "/guide/extra-2.html",
  "title": "加餐二｜任务调度：有了setTimeOut，为什么还要使用rAF？",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "加餐二｜任务调度：有了setTimeOut，为什么还要使用rAF？"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "单消息队列的队头阻塞问题",
      "slug": "单消息队列的队头阻塞问题",
      "children": []
    },
    {
      "level": 2,
      "title": "Chromium 是如何解决队头阻塞问题的？",
      "slug": "chromium-是如何解决队头阻塞问题的",
      "children": [
        {
          "level": 3,
          "title": "1. 第一次迭代：引入一个高优先级队列",
          "slug": "_1-第一次迭代-引入一个高优先级队列",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 第二次迭代：根据消息类型来实现消息队列",
          "slug": "_2-第二次迭代-根据消息类型来实现消息队列",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 第三次迭代：动态调度策略",
          "slug": "_3-第三次迭代-动态调度策略",
          "children": []
        },
        {
          "level": 3,
          "title": "4. 第四次迭代：任务饿死",
          "slug": "_4-第四次迭代-任务饿死",
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
      "title": "参考资料",
      "slug": "参考资料",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "guide/extra-2.md"
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
