// 基于vue 扩展一些功能（全局组件(component)，原型方法|属性(vue.prototype.)，自定义指令，过滤器）

// 导入封装面包屑的组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install: (Vue) => {
    // Vue 是vue的构造函数 当main.js使用use的时候传进来的
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
