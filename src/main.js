import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 axios
// import axios from 'axios'
import axios from '@/api'

// 导入路由
// 提供的一个绝对路径别名
// import router from '@/router'
import router from './router'
Vue.prototype.$http = axios

// 注册原型属性
Vue.prototype.$http = axios

Vue.use(ElementUI)
// 在控制台输出日志，日志
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
