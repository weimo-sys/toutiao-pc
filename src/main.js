import Vue from 'vue'
import App from './App.vue'
// 导入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由
// 提供的一个绝对路径别名
// import router from '@/router'
import router from './router'

Vue.use(ElementUI)
// 在控制台输出日志，日志
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
