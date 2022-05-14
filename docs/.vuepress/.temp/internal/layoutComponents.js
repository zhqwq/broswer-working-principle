import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/Users/kaiwe/Desktop/Web Projects/vuepress-broswer-working-principle/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("C:/Users/kaiwe/Desktop/Web Projects/vuepress-broswer-working-principle/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
