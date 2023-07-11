import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'
import Layout from '@/layout/index.vue'

// 常规路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录',
      showLink: false
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
      title: '图标',
      icon: 'icon'
    }
  }
]
// 同步路由模块数据
const modules = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(modules).forEach(key => {
  routes.push((modules[key] as any).default)
})
// 开发环境，加载icon路由
if (import.meta.env.MODE === 'development') {
  routes.push({
    path: '/icon',
    component: Layout,
    meta: {
      rank: 2
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/Icon.vue'),
        meta: {
          icon: 'icon',
          title: '图标'
        }
      }
    ]
  })
}
// 菜单排序
routes.sort((a: any, b: any) => {
  return (
    a.meta && b.meta && a.meta.rank && b.meta.rank && a.meta.rank - b.meta.rank
  )
})

console.log(routes, '======测试')

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
  strict: true,
  // scrollBehavior(to, from, savedPosition) {
  scrollBehavior() {
    return { left: 0, top: 0 }
    // return new Promise(resolve => {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     if (from.meta.saveSrollTop) {
    //       const top: number =
    //         document.documentElement.scrollTop || document.body.scrollTop
    //       resolve({ left: 0, top })
    //     }
    //   }
    // })
  }
})

export const constantRoutes = routes

export default router
