export const siteData = {
  "base": "/broswer-working-principle/",
  "lang": "zh-CN",
  "title": "浏览器工作原理与实践",
  "description": "浏览器工作原理与实践 - 李兵",
  "head": [],
  "locales": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
