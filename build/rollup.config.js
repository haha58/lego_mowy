
//@rollup/plugin-commonjs 将commonjs模块转为es模块
import commonjs from "rollup-plugin-commonjs";
//@rollup/plugin-image 识别图片文件
import images from "@rollup/plugin-image";
//@rollup/plugin-node-resolve 帮助 rollup 识别外部模块
import nodeResolve from "@rollup/plugin-node-resolve";
//autoprefixer css自动补齐前缀
import autoprefixer from "autoprefixer";
//rollup 打包
import { defineConfig } from "rollup";
//rollup-plugin-esbuild 将 esbuild 集成到 Rollup 构建流程,提高构建速度
import esbuild from "rollup-plugin-esbuild";
//rollup-plugin-filesize 显示打包的内容
import filesize from "rollup-plugin-filesize";
//识别lang="ts"文件
import typescript from 'rollup-plugin-typescript2';
//rollup-plugin-postcss 编译css
import postcss from "rollup-plugin-postcss";
//rollup-plugin-babel babel插件 将es6+转为es5
import babel from "@rollup/plugin-babel";
//直接复制静态文件
import copy from "rollup-plugin-copy";
//rollup-plugin-vue vue2.x使用5.x版本 vue3使用6.x版本
import vue from "rollup-plugin-vue";
//rollup-plugin-terser 压缩代码
import terser from "@rollup/plugin-terser";
//@rollup/plugin-alias 路径别名
import alias from "@rollup/plugin-alias";
//watch模式打包时排除第三方依赖
import replace from '@rollup/plugin-replace';
import path from "path";
//开启热更新
import livereload from 'rollup-plugin-livereload';
//去除deps依赖包
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { fileURLToPath } from "url";
import pkg from "../package.json" assert { type: "json" };
const { name, version } = pkg;
const file = (type) => `dist/${name}.${type}.js`;
export { file, name };
const __filenameNew = fileURLToPath(import.meta.url);
//process.env.NODE_ENV有空字符，记得去空格
const isProd = process.env.NODE_ENV.trim() === "production";

const config={
  input: "src/index.ts",
  output: {
    name,
    file: file("esm"),
    format: "es",
    globals: {
      vue: "Vue",
      lodash: "_",
    },
    inlineDynamicImports: true,
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
      optimizeSSR: true,
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs"],
    }),
    nodeResolve({
      extensions: [".vue"], // 无后缀名引用时，需要识别 .vue 文件
      exclude: "**/node_modules/**", // 排除node_modules
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(path.dirname(__filenameNew, "../src")),
          customResolver: nodeResolve({
            extensions: [".js", ".jsx", ".vue", ".less"],
          }),
        },
      ],
    }),
    commonjs({ sourceMap: false }),
    filesize(),
    terser(),
    peerDepsExternal({
      includeDependencies: !isProd, // 开启该选项，排除dependencies
    }),
    esbuild({
      include: /.[jt]sx?$/,
      sourceMap: !isProd,
      minify: isProd,
      target: "esnext",
      loaders: {
        ".vue": "ts",
      },
      tsconfig: "tsconfig.json", // default
    }),
    postcss({
      extract: true,
      minimize: isProd, // 生产环境开启压缩
      plugins: [autoprefixer()],
      extensions: [".css", ".less"], // 在打包过程中需要配合  less使用
      process: function (context, payload) {
        return new Promise((resolve, reject) => {
          less.render(
            {
              file: context,
            },
            function (err, result) {
              if (!err) {
                resolve(result);
              } else {
                reject(err);
              }
            }
          );
        });
      },
    }),
    images({ include: ["**/*.png", "**/*.jpg", "**/*.svg"] }),
    copy({
      targets: [
        {
          src: "src/assets/*",
          dest: "dist/public",
        },
      ],
    }),
    typescript(),
    replace({
      preventAssignment: true,
      VERSION: JSON.stringify(version)
    })
  ],
  watch: {
    include: "src/**",
  },
  external: ["lodash-es", "ant-design-vue", /@babel\/runtime/],
}
if (!isProd) {
  config.plugins.push(livereload())
}
export default defineConfig(config);