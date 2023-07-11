import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { validatePhone, validatePassword } from '@/utils/form'

/** 4位数字验证码正则 */
export const REGEXP_SIX = /^\d{4}$/

const formRules: FormRules = {
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!validatePhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不得为空'))
        } else if (!validatePassword(value)) {
          callback(
            new Error('密码格式应为8-18位数字、字母、符号的任意两种组合')
          )
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不得为空'))
        } else if (!REGEXP_SIX.test(value)) {
          callback('验证码只得为4位的数字')
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
/** 登录校验 */
const loginRules = reactive<FormRules>({
  phone: formRules.phone,
  password: formRules.password,
  verifyCode: formRules.verifyCode
})

/** 手机登录校验 */
const phoneRules = reactive<FormRules>({
  phone: formRules.phone,
  verifyCode: formRules.verifyCode
})

/** 忘记密码校验 */
const updateRules = reactive<FormRules>({
  phone: formRules.phone,
  verifyCode: formRules.verifyCode,
  password: formRules.password
})

export { loginRules, phoneRules, updateRules }
