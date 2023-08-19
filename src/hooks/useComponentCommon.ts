import _ from 'lodash-es'
import { computed } from 'vue'

export default function useComponentCommon<T extends { [propname: string]: any }>(
  props: T,
  picks: string[]
) {
  // 没有computed，styleProps会失去响应式
  const styleProps = computed(() => _.pick(props, picks))

  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      // window.location.href = props.url
    }
  }

  return {
    styleProps,
    handleClick
  }
}
