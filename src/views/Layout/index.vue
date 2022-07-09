<template>
  <nav>
    <Topnav/>
  </nav>
  <header>
    <Header/>
  </header>
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

<script>
import Topnav from './components/topnav'
import Header from './components/header'
import Footer from './components/footer'

export default {
  name: 'xtx-layout',
  components: {
    Topnav,
    Header,
    Footer
  }
}
</script>

<style scoped lang='less'>
//手动导入公共样式
//@import '@/styles/variables.less';

.xtx-home-page {
  color: @xtxColor;
}
</style>
