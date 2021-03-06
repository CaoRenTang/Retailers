import { createRouter, createWebHashHistory } from 'vue-router'
import Pay from '@/views/Member/pay'
// import HomeView from '../views/HomeView.vue'
// 导入路由页面（懒加载形式）
// 父页面
const Layout = () => import('@/views/Layout')
// 首页
const Home = () => import('@/views/Home')
// 分类
const Category = () => import('@/views/Category')
// 商品
const Goods = () => import('@/views/Goods/index')
// 登录
const Login = () => import('@/views/Login')
// 购物车
const Cart = () => import('@/views/Cart')
// 订单页
const Order = () => import('@/views/order')
// 支付页面
const Payment = () => import('@/views/Member/pay')
const routes = [
  {
    path: '/',
    component: Layout, // 子路由
    children: [{
      path: '/',
      component: Home
    }, {
      path: '/Category/:id',
      component: Category
    }, {
      path: '/goods/:id',
      component: Goods
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/pay',
      component: Payment
    }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次跳转页面返回首页顶部
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
