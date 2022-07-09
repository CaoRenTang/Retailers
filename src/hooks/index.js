/**
 * 全局可复用的hooks钩子函数
 * 命名约定：use开头
 */
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

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
