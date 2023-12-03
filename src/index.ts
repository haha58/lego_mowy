import { App } from 'vue'
import LText from './components/l-text/index.vue'

const components = [LText]

// 遍历components，并注册全局组件
const install = (app: App) => {
  components.forEach(component => {
    console.log(component)
    app.component(component.name, component)
  })
}
// 按需导出
export { LText }

// 整体导出
export default { install }
