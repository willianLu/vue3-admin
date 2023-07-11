<template>
  <div>我是首页</div>
</template>
<script setup lang="ts">
import Loading from '@/components/loading'
import { delay } from '@/utils/util'

defineOptions({
  name: 'HomePage'
})
console.log('========Home初始化=========')
async function getData() {
  Loading.show()
  await delay(2000)
  Loading.hide()
}
getData()
</script>
<style lang="scss" scoped></style>
