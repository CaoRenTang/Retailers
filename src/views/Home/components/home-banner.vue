<template>
  <div class="home-banner">
    <XtxSlider :data="bannerList" autoPlay/>
  </div>
</template>

<script>
import { findBannerAPI } from '@/api/home'
import { onMounted, ref } from 'vue'

export default {
  name: 'HomeBanner',
  setup () {
    // 定义一个新数组接口轮播图数据
    const bannerList = ref([])

    // 调用接口请求轮播图
    async function getBannerList () {
      const { data } = await findBannerAPI()
      console.log('轮播图数据', data)
      // 将轮播图数据保存到数组中
      bannerList.value = data.result
    }

    // 生命周期钩子函数
    onMounted(() => {
      getBannerList()
    })
    return { bannerList }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
