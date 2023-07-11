<template>
  <div class="select-none">
    <img src="@/assets/login/bg.png" class="wave" />
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <h2 class="outline-none">七天汇</h2>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <el-form-item prop="phone">
              <el-input
                v-model="ruleForm.phone"
                clearable
                placeholder="请输入手机号"
                :prefix-icon="UserIcon"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                clearable
                show-password
                placeholder="请输入密码"
                :prefix-icon="UnlockIcon"
              />
            </el-form-item>

            <el-form-item prop="verifyCode">
              <el-input
                v-model="ruleForm.verifyCode"
                clearable
                maxlength="4"
                placeholder="验证码"
              >
                <template #prefix>
                  <SvgIcon name="safety"></SvgIcon>
                </template>
                <template #append>
                  <ReImageVerify v-model:code="imgCode" />
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <div class="flex-center-space-between w-full">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <el-button link type="primary">忘记密码？</el-button>
              </div>
            </el-form-item>
            <div>
              <el-button
                class="w-full"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
                >登录</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRaw, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import ReImageVerify from '@/components/ReImageVerify'
import avatar from '@/assets/login/avatar.svg'
import illustration from '@/assets/login/illustration.svg'
import UserIcon from '@/icons/user.svg'
import UnlockIcon from '@/icons/unlock.svg'
import { loginRules } from './utils/rule'
import useUserStore from '@/store/user'
import { message } from '@/utils/message'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LoginPage'
})
const router = useRouter()
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  phone: '15555667788',
  password: 'admin123',
  verifyCode: '1234'
})
const imgCode = ref('')
const loading = ref(false)
const checked = ref(false)
const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const [res] = await userStore.login({
        ...ruleForm
      })
      if (res && res.code === 200) {
        message('登录成功', { type: 'success' })
        router.push('/')
      }
      loading.value = false
    } else {
      loading.value = false
      return fields
    }
  })
}
</script>

<style lang="scss" scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}

.login-form {
  width: 360px;
}

.avatar {
  width: 350px;
  height: 80px;
}

.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: bold 200% Consolas, Monaco, monospace;
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form {
    width: 290px;
  }

  .login-form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 360px;
  }

  .avatar {
    width: 280px;
    height: 80px;
  }
}

@media screen and (max-width: 968px) {
  .wave {
    display: none;
  }

  .img {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}

.w-full {
  width: 100%;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
