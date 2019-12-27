// 配置路由
import VueRouter from 'vue-router'
import Vue from 'vue'

// @是vuecli提供的绝对路径(./src)
import Login from '@/views/login'

// 导入home组件
import Home from '@/views/home'

// 导入welcome组件(二级组件)
import Welcome from '@/views/welcome'

// 导入404组件
import NotFound from '@/views/404'

// 导入工具配置
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 主页
    { path: '/',
      component: Home,
      // 欢迎页面
      children: [
        { path: '/', component: Welcome }
      ]
    },
    // 404页面 (* 通配 除了上面所有的路由地址外，通配其它所有地址)
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // to 去哪里
  // from 来自哪里
  // next 放行，指定到跳转路由
  // 如果是除去登录页面外的其它的路由 且 当前没有登录，都拦截登录
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 其它情况放行
  next()
})
export default router
