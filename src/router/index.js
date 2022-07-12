import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// 导入路由页面（懒加载形式）
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const routes = [{
  path: '/',
  component: Layout,
  // 子路由
  children: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/Category/:id',
      component: Category
    }
  ]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
