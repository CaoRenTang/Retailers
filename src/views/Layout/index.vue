<template>
  <nav>
    <Topnav/>
  </nav>
  <header>头部</header>
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
import Topnav from './components/topnav'

export default {
  name: 'xtx-layout',
  components: {
    Topnav
  }
}
</script>

<style scoped lang='less'>
@import '~@/styles/variables.less';

.xtx-home-page {
  color: @xtxColor;
}
</style>
