
// 提供一个配置好的axios， 然后导出， 在main.js来使用
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIGINT from 'json-bigint'

// 默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置头部的代码不能在此处定义，这里的代码只会在刷新页面后执行一次
// axios.defaults.headers.Authorization = `Bearre ${store.getUser().token}`

axios.defaults.transformResponse = [(data) => {
  // 使用 json-bigint 进行转换
  try {
    return JSONBIGINT.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  // config(配置函数) 相当于defaults(默认配置)
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  // 返回配置好的config给发送请求的时候用
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 根据当前响应状态吗是不是401去跳转登录页面
  // err 对象包含：错误时候的响应对象 err.response
  // 状态码 err.response.status
  if (err.response && err.response.status === 401) {
    // 在vue组件中this.$router.push(./login)  路由实例$router提供的push函数
    // 在js模块中：导入创建好的实例对象调用push函数
    router.push('./login')
  }
  return Promise.reject(err)
})

export default axios
