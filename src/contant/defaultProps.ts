import { CommonComponentProps, ImageComponentProps, TextComponentProps } from '@/ts/defaultProps'
import _ from 'lodash-es'
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '373px',
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
  position: 'absolute',
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

// 排除'text','actionType','url'，默认style样式的名字
export const transformStyleNames = _.without(
  Object.keys(textDefaultProps),
  'text',
  'actionType',
  'url'
)
export const componentsDefaultProps = {
  'l-text': {
    props: textDefaultProps
  },
  'l-image': {
    props: imageDefaultProps
  }
}
