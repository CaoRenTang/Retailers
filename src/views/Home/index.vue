<template>
  <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory/>
    <!-- banner轮播图 -->
    <HomeBanner/>
    <!--新鲜好物-->
    <HomeNew/>
    <!--人气推荐-->
    <HomeHot/>
    <!--商品楼层-->
    <HomeProduct/>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeProduct from './components/home-product'

export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeProduct
  }
}
</script>

<style lang='less' scoped>
.title {
  color: @helpColor;
}
</style>
