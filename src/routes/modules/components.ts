import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const route: RouteRecordRaw = {
  path: '/components',
  redirect: '/components/message',
  component: Layout,
  meta: {
    rank: 3,
    icon: 'screen',
    title: '组件'
  },
  children: [
    {
      path: 'message',
      name: 'MessageComponentPage',
      component: () => import('@/views/components/message/index.vue'),
      meta: {
        title: '消息提示',
        icon: 'popup'
      }
    },
    {
      path: 'popup',
      name: 'PopupComponentPage',
      component: () => import('@/views/components/popup/index.vue'),
      meta: {
        title: 'popup提示',
        icon: 'popup'
      }
    }
  ]
}
export default route
