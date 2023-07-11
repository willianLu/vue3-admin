<template>
  <div class="flex-center-space-between navbar">
    <div class="flex-center" style="height: 100%">
      <hamburger
        id="hamburger-container"
        :is-active="appStore.sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img src="@/assets/images/avatar.png" class="user-avatar" />
          <div>
            <p class="user-role">超级管理员</p>
            <p class="user-name">陆询<svg-icon name="down"></svg-icon></p>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>文档</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hamburger from './hamburger.vue'
import BreadCrumb from './breadCrumb.vue'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { useRouter, useRoute } from 'vue-router'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const toggleSideBar = () => {
  appStore.toggleSideBar()
}

const logout = async () => {
  await userStore.logout()
  router.push(`/login?redirect=${route.fullPath}`)
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name,
        .user-role {
          color: #333;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          line-height: 1.2em;
          margin: 0;
        }
        .user-role {
          color: #666;
          margin-top: 8px;
          font-size: 13px;
        }
        .svg-icon {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
