<template>
  <nav>
    <Topnav/>
  </nav>
  <header>
    <Header/>
    <!-- 吸顶组件 -->
    <HeaderSticky/>
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
import HeaderSticky from './components/header-sticky'
import { useStore } from 'vuex'

export default {
  name: 'xtx-layout',
  components: {
    Topnav,
    Header,
    Footer,
    HeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('cate/getCateList')
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
