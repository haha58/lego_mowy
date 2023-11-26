import { TextComponentProps } from '@/ts/defaultProps'
import { VNode } from 'vue'
// 选项
export interface optionProps {
  label: string | VNode
  value: string
}
// 将属性转成form表单
export interface PropsToForm {
  componentName: string
  // 副组件
  subComponentName?: string
  // 默认参数 ！！
  options?: optionProps[]
  value?: string
  text: string
  // 组件的额外属性
  extraProps?: {
    [key: string]: any
  }
  // 初始化的方法  (v: any) => any!!!
  initalTransform?: (v: any) => any
  // 选中后转换
  afterTransform?: (v: any) => any
  // 触发事件的名称
  eventName?: string
  // 事件
  events?: { [key: string]: (e: any) => void }
}

// 属性列表转化成表单列表
export type PropsToForms = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof TextComponentProps]?: PropsToForm
}

// antd vue的组件名称改成符合tsx的组件
export interface AntdNameToComponentProps {
  [key: string]: any
}
