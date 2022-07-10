/*
* vue插件，统一管理注册组件
*
*/
import Skeleton from './Skeleton'

export default {
  install (app) {
    app.component(Skeleton.name, Skeleton)
  }
}
