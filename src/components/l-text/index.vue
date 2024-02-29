<template>
  <component :is="tag" class="l-text-component" :style="styleProps" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { textDefaultProps, transformStyleNames } from '@/contant/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'
import { TextTagProps, transformToComponentProps } from '@/ts/defaultProps'
import { defineComponent, PropType } from 'vue'
const defaultProps = transformToComponentProps(textDefaultProps)

export default defineComponent({
  name: 'LText',
  props: {
    tag: { type: String as PropType<TextTagProps>, required: false, default: 'div' },
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, transformStyleNames)
    return { styleProps, handleClick }
  }
})
</script>

<style lang="less" scoped>
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
  width: 100%;
  height: 100%;
}
</style>
