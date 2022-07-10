import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入重置样式的包
import 'normalize.css'
// 导入公用样式
import '@/styles/common.less'
// 引入骨架组件
import componentPlugin from '@/components'
// 导入组件库
import RabbitUi from 'rabbit-ui-core'
import 'rabbit-ui-core/dist/rabbit-ui.css'
// 注册全局指令
import Directives from '@/directives'

createApp(App).use(store).use(router).use(Directives).use(RabbitUi).use(componentPlugin).mount('#app')
