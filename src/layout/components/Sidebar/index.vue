<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sidebar-item
          v-for="item in constantRoutes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/assets/css/variables.module.scss'
import useAppStore from '@/store/app'
import { constantRoutes } from '@/routes'

const route = useRoute()
const appStore = useAppStore()
const showLogo = ref(true)
const activeMenu = computed(() => {
  if (route.meta.activeMenu) {
    return route.meta.activeMenu
  }
  return route.path
})
const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})
</script>
