/**
 *图片懒加载全局指令
 */
// 引入监听是否进入视口
import { useIntersectionObserver } from '@vueuse/core'
import Load from '@/assets/images/load.gif'

export default {
  install (app) {
    // 定义全局指令
    app.directive('imgLazy', {
      // 在绑定元素的父组件挂载之后调用
      /**
       *
       * @param {*} el 绑定指令的元素的dom对象
       * @param {*} bind 获取指令绑定的变量值
       */
      mounted (el, bind) {
        // console.log('指令执行：', el, bind)
        const { stop } = useIntersectionObserver(
          el, // 监控目标元素
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 图片进入可视区了
              // 默认先显示loading图片
              el.src = Load

              setTimeout(() => {
                // 延迟200ms 下载并渲染图片
                el.src = bind.value
              }, 150)

              el.onerror = () => {
                // 图片加载失败
                el.src = Load
              }
              // 关闭监控
              stop()
            }
          }
        )
      }
    })
  }
}
