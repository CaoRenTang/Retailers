import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入重置样式的包
import 'normalize.css'
// 导入公用样式
import '@/styles/common.less'
// 导入组件库
import RabbitUi from 'rabbit-ui-core'
import 'rabbit-ui-core/dist/rabbit-ui.css'

createApp(App).use(store).use(router).use(RabbitUi).mount('#app')
