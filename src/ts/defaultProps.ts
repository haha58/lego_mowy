import _ from 'lodash-es'
export interface CommonComponentProps {
  // actions
  actionType: string
  url: string
  // size
  height: string
  width: string
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string
  // border type
  borderStyle: string
  borderColor: string
  borderWidth: string
  borderRadius: string
  // shadow and opacity
  boxShadow: string
  opacity: string
  // position and x,y
  position: string
  left: string
  top: string
  right: string
}

// 字体 追加
export interface TextComponentProps extends CommonComponentProps {
  text: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: string
  textAlign: string
  color: string
  backgroundColor: string
}

// 图片 追加
export interface ImageComponentProps extends CommonComponentProps {
  src: string
}

// 转换组件的props
export const transformToComponentProps = (props: { [propname: string]: any }) => {
  return _.mapValues(props, (prop: any) => ({
    type: prop.constructor,
    default: prop
  }))
}
