<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="appStore.device === 'mobile' && appStore.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': true }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { AppMain, Navbar, Sidebar } from './components'
import useAppStore from '@/store/app'
import { useWindowSize } from '@/hooks/useWindowSize'

const appStore = useAppStore()
const rect = useWindowSize()
// 设置侧边栏形态
const resizeHandler = () => {
  const isMobile = rect.width.value < 992
  appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
  if (isMobile) {
    appStore.closeSideBar(true)
  }
}
resizeHandler()
watch([rect.width], () => {
  resizeHandler()
})
// 容器的class
const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === 'mobile'
  }
})
const handleClickOutside = () => {
  appStore.closeSideBar(false)
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.module.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
