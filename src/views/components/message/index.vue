<template>
  <div>我是消息提示组件</div>
  <div>
    <el-button @click="isShow = !isShow">切换组件</el-button>
  </div>
  <TcA v-if="isShow"></TcA>
  <TcB v-else></TcB>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TcA from './a.vue'
import TcB from './b.vue'
defineOptions({
  name: 'MessageComponentPage'
})

const isShow = ref(true)
</script>
