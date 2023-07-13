<template>
  <div v-copy:click="text">我是组件A</div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
const text = '我的卡减肥快速减肥快说就'
onMounted(() => {
  console.log('======我是组件A======')
})

onUnmounted(() => {
  console.log('======组件A卸载======')
})
</script>
