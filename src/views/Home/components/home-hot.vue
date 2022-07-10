<template>
  <Pannel ref="target" title="人气推荐" sub="人气爆棚 不容小觑">
    <template #right>
      <xtx-more/>
    </template>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt=""/>
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </Pannel>
</template>

<script>
import { findHotAPI } from '@/api/home'
import { ref } from 'vue'
// 1. 导入监控元素是否进入可视区钩子函数
import { useIntersectionObserver } from '@vueuse/core'

export default {
  setup () {
    const hotList = ref([])
    // 获取人气推荐数据
    const getHot = async () => {
      const { data } = await findHotAPI()
      console.log('人气推荐：', data)
      hotList.value = data
    }
    // onMounted(() => {
    //   getHot()
    // })
    // 测试
    // 2. 指定监控的目标元素
    const target = ref(null)

    const { stop } = useIntersectionObserver(
      target, // 指定监控的元素
      ([{ isIntersecting }]) => {
        // 说明❓：被监控元素进入或离开可视区，会反复执行这个回调函数
        console.log('人气推荐否进入可视区：', isIntersecting ? '进来了' : '离开了')
        if (isIntersecting) {
          // 获取组件数据（只执行一次）
          getHot()
          // 关闭监控
          stop()
        }
      }
    )

    return {
      hotList,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
