//引入路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import success from '../components/Success.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/admin/User.vue'
import Product from '../components/Product'
import Text from '../components/Text'

Vue.use(VueRouter)

const routes = [
  {
    path: '/success',
    component: success
  },
  {
    path: '/text',
    component: Text
  },

  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome }, { path: '/user', component: User }, { path: '/product', component: Product }, { path: '/text', component: Text }
    ],
  },
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from:从哪里访问的路径
  // next:之后要做的任务，是一个函数
  //    next（）放行， next（'/URL'）强制跳转的路径。
  if (to.path == '/login') return next();// 访问路径为登录
  // 获取flag
  const flagStr = window.sessionStorage.getItem("flag");// session取值
  console.log(flagStr);
  if (!flagStr) return next('/login');// 没登录去登录
  next();
})

export default router// 暴露出去
