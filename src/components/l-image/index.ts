import type { App } from 'vue'

import LImage from './index.vue'
// 注册单个组件的插件
LImage.install = (app: App) => {
  app.component(LImage.name, LImage)
}

export default LImage
