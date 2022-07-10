/**
 * 全局可复用的hooks钩子函数
 * 命名约定：use开头
 */
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useIntersectionObserver } from '@vueuse/core/index'

/**
 * 获取分类菜单数据
 */
export function useCate () {
  // 获取store实例: store === this.$store
  const store = useStore()
  onMounted(() => {
    store.dispatch('cate/getCateList')
  })

  // 计算获取分类菜单数据
  const list = computed(() => {
    return store.state.cate.list
  })
  // console.log('test:', list)
  return { list }
}

/*
*组件懒加载实现封装
*
*/
export function useLazy (apiFn) {
  // 1. 指定监控的目标元素
  const target = ref(null)
  // 2. 执行监控
  const { stop } = useIntersectionObserver(
    target, // 指定监控的元素
    ([{ isIntersecting }]) => {
      // 说明❓：被监控元素进入或离开可视区，会反复执行这个回调函数
      // console.log('人气推荐否进入可视区：', isIntersecting ? '进来了' : '离开了')
      if (isIntersecting) {
        // 获取组件数据（只执行一次）
        apiFn()
        // 关闭监控
        stop()
      }
    }
  )
  return { target }
}
