<template>
  <l-image src="http://static.imooc-lego.com/upload-files/logo-white-735536.png" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LImage } from './components'

export default defineComponent({
  name: 'App',
  components: { LImage },
  setup() {
    return {}
  }
})
</script>

<style></style>
