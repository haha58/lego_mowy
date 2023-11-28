/* eslint-disable prettier/prettier */
// 将commonjs模块转为es模块
import cjs from '@rollup/plugin-commonjs'
// @rollup/plugin-node-resolve 帮助 rollup 识别外部模块
import { nodeResolve } from '@rollup/plugin-node-resolve'
import CleanCSS from 'clean-css'
import fs from 'fs'
// rollup-plugin-babel babel插件 将es6+转为es5
import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-css-only'
import typescript from 'rollup-plugin-typescript2'
// rollup-plugin-vue vue2.x使用5.x版本 vue3使用6.x版本
import vue from 'rollup-plugin-vue'
// rollup-plugin-copy 直接复制静态文件
import copy from 'rollup-plugin-copy'
// rollup-plugin-terser 压缩代码
import { terser } from 'rollup-plugin-terser'
// @rollup/plugin-alias 路径别名
import alias from '@rollup/plugin-alias'
import image from '@rollup/plugin-image'
import livereload from 'rollup-plugin-livereload'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import requireContext from 'rollup-plugin-require-context'
import svg from 'rollup-plugin-svg'
import url from 'rollup-plugin-url'
import conf from '../package.json' assert { type: 'json' }
import sass from 'node-sass'

const isProd = process.env.BUILD === 'production'
const { name } = conf
const file = type => `dist/${name}.${type}.js`
console.log(file('esm'), name)
export { file, name }

const config = {
  input: 'src/main.js',
  output: {
    name,
    file: file('esm'),
    format: 'es',
    globals: {
      vue: 'Vue',
      lodash: '-'
    },
    inlineDynamicImports: true
  },
  plugins: [
    typescript(),
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main', 'browser'],
      exclude: '**/node_modules/**', // 排除node_modules
      extensions: ['.vue', '.js'] // 无后缀名引用时，需要识别 .vue 文件
    }),
    alias({
      // entries: [
      //   {
      //     find: 'demo-lib', // 别名名称，作为依赖项目需要使用项目名
      //     replacement: path.resolve(__dirname, 'src'),
      //     customResolver: resolve({
      //       extensions: ['.js', '.jsx', '.vue', '.sass', '.scss']
      //     })
      //   }
      // ]
    }),
    vue({
      css: false,
      compileTemplate: true
    }),
    css({
      output(style) {
        !fs.existsSync('dist') && fs.mkdirSync('dist')
        fs.writeFileSync(`dist/${name}.css`, new CleanCSS().minify(style).styles)
      }
    }),
    // 将不需要编译的静态文件直接复制到dist
    copy({
      targets: [{ src: 'public/tinymce/*', dest: 'dist/tinymce' }]
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
    }),
    cjs({
      sourceMap: false
    }),

    terser(),
    postcss({
      extract: true,
      minimize: isProd, // 生产环境开启压缩
      extensions: ['.css', '.scss'], // 识别css和scss文件
      // 在打包过程中需要配合 node-sass 使用
      // eslint-disable-next-line space-before-function-paren
      process: function (context, payload) {
        return new Promise((resolve, reject) => {
          sass.render(
            {
              file: context
            },
            function(err, result) {
              if (!err) {
                resolve(result)
              } else {
                reject(err)
              }
            }
          )
        })
      }
    }),
    url({
      include: ['**/*.woff', '**/*.ttf'], // 打包字体为base64
      limit: Infinity
    }),
    image(),
    svg(),
    requireContext(),
    livereload(),
    // 该插件默认排除peerDependencies中的依赖
    peerDepsExternal({
      includeDependencies: !isProd // 开启该选项，排除dependencies
    })
  ],
  external: ['lodash-es', 'ant-design-vue', /@babel\/runtime/], // 排除的依赖包
  watch: {
    include: 'src/**'
  }
}

if (!isProd) {
  config.plugins.push(livereload())
}
export default config
