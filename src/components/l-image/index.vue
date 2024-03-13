<template>
  <img
    class=".l-image-component"
    :style="styleProps"
    :src="src"
    :draggable="false"
    @click.prevent="handleClick"
  />
</template>
<script lang="ts">
import { componentsDefaultProps, transformStyleNames } from '@/contant/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'
import { transformToComponentProps } from '@/ts/defaultProps'
import { defineComponent } from 'vue'
const defaultProps = transformToComponentProps(componentsDefaultProps['l-image'].props)

export default defineComponent({
  name: 'LImage',
  props: {
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, transformStyleNames)
    return { styleProps, handleClick }
  }
})
</script>

<style lang="less" scoped>
.l-image-component {
  max-width: 100%;
}
</style>
