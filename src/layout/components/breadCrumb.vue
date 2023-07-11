<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="item.path"
        >{{ item.title }}</el-breadcrumb-item
      >
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { routePathResolve } from '@/utils/util'
const route = useRoute()
const levelList: any = ref([])
const router = useRouter()
const routes: any = router.options.routes

/** 查找对应 `path` 的路由信息 */
function findRouteByPath(
  path: string,
  routes: RouteRecordRaw[],
  parents: any[] = [],
  prefix = ''
) {
  for (let i = 0; i < routes.length; i++) {
    const current = routes[i]
    const fullPath = routePathResolve(prefix, current.path)
    if (fullPath === path) {
      parents.push({
        path: fullPath,
        title: current.meta?.title
      })
      return parents
    } else if (
      path.indexOf(fullPath) === 0 &&
      current.children &&
      current.children.length
    ) {
      const temp = [...parents]
      if (current.meta?.title) {
        temp.push({
          path: fullPath,
          title: current.meta?.title
        })
      }
      const res: any = findRouteByPath(path, current.children, temp, fullPath)
      if (res) return res
    }
  }
}
const getBreadcrumb = () => {
  levelList.value = findRouteByPath(route.path, routes) || []
}
onMounted(() => {
  getBreadcrumb()
})

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  {
    deep: true
  }
)
</script>
