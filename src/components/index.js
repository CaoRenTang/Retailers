/*
* vue插件，统一管理注册组件
*
*/
// 骨架屏组件注册
import Skeleton from './Skeleton'
// 面板组件
import Pannel from './Pannel'

export default {
  install (app) {
    app.component(Skeleton.name, Skeleton)
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Pannel', Pannel)
  }
}
