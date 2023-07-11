import { defineStore } from 'pinia'
import { userLogin } from '@/api/user'
import { UserInfo } from '@/types'
import { setToken, removeToken } from '@/utils/token'

/**
 * @description 用户相关的全局数据状态管理，包括：用户信息，登录信息等
 */
export default defineStore('user', {
  state: (): {
    token: string
    // 标记路由变化的动作
    userInfo?: UserInfo
  } => {
    return {
      token: ''
    }
  },
  actions: {
    async login(data: any) {
      const [res, err] = await userLogin(data)
      if (res && res.code === 200) {
        this.token = res.data.accessToken
        setToken(res.data.accessToken)
      }
      return [res, err]
    },
    logout() {
      this.token = ''
      removeToken()
    }
  }
})
