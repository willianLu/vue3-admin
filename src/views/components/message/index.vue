<template>
  <div>我是消息提示组件</div>
  <div>
    <el-button @click="isShow = !isShow">切换组件</el-button>
  </div>
  <TcA v-if="isShow"></TcA>
  <TcB v-else></TcB>
</template>
<script setup lang="ts">
defineOptions({
  name: 'MessageComponentPage'
})
import { ref } from 'vue'
import TcA from './a.vue'
import TcB from './b.vue'
const isShow = ref(true)
</script>
<style lang="scss" scoped></style>
