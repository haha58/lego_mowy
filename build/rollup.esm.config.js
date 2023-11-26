import vue from 'rollup-plugin-vue'
import basicConfig from './rollup.config.mjs'

basicConfig.plugins.push(vue({ css: false }))

export default {
  ...basicConfig,
  // output: {
  //   name,
  //   file: file('esm'),
  //   format: 'esm'
  // }
}