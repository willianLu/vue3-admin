import router from './router'
import NProgress from '@/utils/progress'

/** 路由白名单 */
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 无匹配的组件时，代表不存在的路由
  if (to.matched.length === 0) {
    return next('/404')
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
