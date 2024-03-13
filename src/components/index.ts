import LText from './l-text/index.vue'
import LImage from './l-image/index.vue'
const components = [LText, LImage]

const install = (app: any) => {
  components.map(component => {
    app.use(component)
  })
}

export { install, LText, LImage }

export default { install }
