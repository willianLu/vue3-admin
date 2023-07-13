import { createApp, type Directive } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import '@/assets/css/index.scss'
import App from './App.vue'
import Env from '@/env'
import Config from '@/config'
console.log(Env, '=====环境=====')
console.log(Config, '======配置=====')
// 开发环境动态引入mock
// if (import.meta.env.MODE === 'development') {
//   import('../mock/index')
// }
import '../mock/index'

const app = createApp(App)

// 自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(createPinia()).use(router).mount('#app')
