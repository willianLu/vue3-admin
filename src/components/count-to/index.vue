<template>
  <span>{{ displayValue }}</span>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed, onUnmounted } from 'vue'
import {
  requestAnimationFrame,
  cancelAnimationFrame
} from '@/utils/requestAnimationFrame'
import { Stats } from 'fs'
import { AnyCnameRecord } from 'dns'
const props = defineProps({
  startVal: {
    type: Number,
    default: 0
  },
  endVal: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 1000
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  // eslint-disable-next-line vue/require-default-prop
  formatter: Function,
  bezierType: {
    type: String,
    default: 'linear'
  }
})
const displayValue = ref<number | string>('')
const state = reactive<{
  startTime: number | null
  currentVal: number
  rAF: any
}>({
  startTime: null,
  currentVal: 0,
  rAF: null
})
// 数字动画 - 差值
const countDown = computed(() => {
  return props.endVal - props.startVal
})
// 获取显示数据
const getDisplayValue = () => {
  displayValue.value = props.formatter
    ? props.formatter(state.currentVal)
    : state.currentVal
}
// 初始化动画
const handleInitAnimation = () => {
  // 差值为0时，显示最终值
  if (countDown.value === 0) {
    state.currentVal = props.endVal
    getDisplayValue()
    return
  }
  // 执行动画
  requestAnimationFrame(handleAnimation)
}
// 贝塞尔曲线函数
const handleAnimation = (timestamp: number) => {
  // 记录开始时间
  if (!state.startTime) {
    state.startTime = timestamp
  }
  // 前进时间
  const progress = timestamp - state.startTime
  // 缓动函数 - https://easings.net/zh-cn#
  // 百分比
  const percent = progress / props.duration
  // 运动值
  state.currentVal = props.startVal + Math.floor(countDown.value * percent)
  getDisplayValue()
  if (progress < props.duration) {
    state.rAF = requestAnimationFrame(handleAnimation)
  } else if (state.currentVal !== props.endVal) {
    state.currentVal = props.endVal
    getDisplayValue()
  }
}
onMounted(() => {
  if (props.autoplay) {
    handleInitAnimation()
  }
})
onUnmounted(() => {
  // 卸载组件时，取消动画函数
  if (state.rAF !== null) {
    cancelAnimationFrame(state.rAF)
  }
})
</script>
