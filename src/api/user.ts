import { post } from '@/utils/http'

export type UserResult = {
  /** 用户名 */
  username: string
  /** 当前登陆用户的角色 */
  roles: Array<string>
  /** `token` */
  accessToken: string
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date
}

// 用户登录
export function userLogin(data: any) {
  return post<UserResult>('/api/login', data)
}
