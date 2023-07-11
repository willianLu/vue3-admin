import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

type Sidebar = {
  // 侧边栏展示/收起
  opened: boolean
  // 是否使用动画
  withoutAnimation: boolean
}

/**
 * @description 用户相关的全局数据状态管理，包括：用户信息，登录信息等
 */
export default defineStore('app', {
  state: (): {
    sidebar: Sidebar
    device: string
  } => {
    return {
      sidebar: {
        opened: Cookies.get('sidebarStatus') === '1',
        withoutAnimation: false
      },
      device: 'desktop'
    }
  },
  actions: {
    async toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      Cookies.set('sidebarStatus', '0')
    },
    toggleDevice(device: string) {
      this.device = device
    }
  }
})
