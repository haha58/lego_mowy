import { mapValues, without } from 'lodash-es'
import { ImageComponentProps, TextComponentProps } from '@/ts/defaultProps'

// the common default props, all the components should have these props
export const commonDefaultProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'relative',
  left: '0',
  top: '0',
  right: '0'
}

// 字体
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const imageDefaultProps: ImageComponentProps = {
  src: 'test.url',
  ...commonDefaultProps
}

export const shapeDefaultProps = {
  backgroundColor: '',
  ...commonDefaultProps
}
// this contains all default props for all the components
// useful for inserting new component into the store
export const componentsDefaultProps = {
  'l-text': {
    props: textDefaultProps
  },
  'l-image': {
    props: imageDefaultProps
  },
  'l-shape': {
    props: shapeDefaultProps
  }
}

export const transformToComponentProps = (
  props: { [key: string]: any },
  extraProps?: { [key: string]: any }
) => {
  const mapProps = mapValues(props, item => {
    return {
      type: item.constructor,
      default: item
    }
  })
  if (extraProps) {
    return { ...mapProps, ...extraProps }
  } else {
    return mapProps
  }
}
export default componentsDefaultProps
// 排除'text','actionType','url'，默认style样式的名字
export const transformStyleNames = without(
  Object.keys(textDefaultProps),
  'text',
  'actionType',
  'url'
)
