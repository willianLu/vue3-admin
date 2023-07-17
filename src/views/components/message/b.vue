<template>
  <div ref="test">我是组件B</div>
  <div>{{ countDown }}</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCountDown } from '@/hooks/useCountDown'
import { useEventListener } from '@/hooks/useEventListener'
import { useClickAway } from '@/hooks/useClickAway'
const { countDown, countDownStart } = useCountDown({ key: 'count-down' })
const test = ref<HTMLDivElement>()

useClickAway(test, () => {
  console.log('========点击其他地方')
})
useEventListener(test, 'click', () => {
  console.log('========我的点击')
})
onMounted(() => {
  console.log('======我是组件B======')
  countDownStart()
})

onUnmounted(() => {
  console.log('======组件B卸载======')
})
</script>
