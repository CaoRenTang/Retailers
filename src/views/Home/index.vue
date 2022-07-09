<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- banner轮播图 -->
        <HomeBanner/>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'

export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style lang='less' scoped>
.title {
  color: @helpColor;
}
</style>
