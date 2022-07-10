/**
 *图片懒加载全局指令
 */
// 引入监听是否进入视口
import { useIntersectionObserver } from '@vueuse/core'
import defaltImg from '@/assets/images/200.png'

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
          // 监听目标元素
          el,
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              // 当图片url无效加载失败的时候使用默认图片替代
              el.onerror = function () {
                el.src = defaltImg
              }
              el.src = bind.value
              stop()
            }
          }
        )
      }
    })
  }
}
