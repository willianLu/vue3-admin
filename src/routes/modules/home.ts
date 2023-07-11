import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const route: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    rank: 1
  },
  children: [
    {
      path: 'home',
      name: 'HomePage',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }
  ]
}
export default route
