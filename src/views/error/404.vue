<script setup lang="ts">
import { useRouter } from 'vue-router'
import NoExist from '@/assets/images/404.svg'

defineOptions({
  name: '404Page'
})

const router = useRouter()
</script>

<template>
  <div class="flex-center wrap">
    <NoExist />
    <div class="ml-32">
      <p>404</p>
      <p>抱歉，你访问的页面不存在</p>
      <el-button type="primary" @click="router.push('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.ml-32 {
  margin-left: 32px;
  p {
    margin-bottom: 12px;
  }
}
</style>
