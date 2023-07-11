<template>
  <div v-if="!(item.meta && item.meta.hidden)">
    <el-menu-item
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
      :index="resolvePath(onlyOneChild.path)"
      :class="{ 'submenu-title-noDropdown': !isNest }"
    >
      <item
        :icon="
          (onlyOneChild.meta && onlyOneChild.meta.icon) ||
          (item.meta && item.meta.icon)
        "
        :title="onlyOneChild.meta && onlyOneChild.meta.title"
      />
    </el-menu-item>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { isExternal, routePathResolve } from '@/utils/util'
import Item from './Item.vue'

defineOptions({
  name: 'SidebarItem'
})

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
const onlyOneChild: any = ref(null)
const hasOneShowingChild = (children: any = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item?.meta?.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return routePathResolve(props.basePath, routePath)
}
</script>
