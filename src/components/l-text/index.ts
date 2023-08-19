import type { App } from 'vue'

import LText from './index.vue'
// 注册单个组件的插件
LText.install = (app: App) => {
  app.component(LText.name, LText)
}

export default LText
