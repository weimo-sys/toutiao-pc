<template>
  <div class="container-login">
    <!-- 卡片组件 -->
    <el-card class="my-card">
        <img src="../../assets/logo_index.png" alt="">
        <!-- 表单组件 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
            <!-- 表单项 -->
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <!-- 复选框 -->
                <!-- 复选框被选中  属性绑定:value="true" -->
                <el-checkbox :value="true">我已经阅读和同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入工具模块
import store from '@/store'

export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑： 1开头  第二位 3-9之间  最后九个数字结尾
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号码格式有误'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录 login()方法
    login () {
      // 先整体表单校验  this.$refs.loginForm获取组件
      this.$refs.loginForm.validate(async (valid) => {
        // valid（是一个形参自定义名称） 判断是否校验成功
        if (valid) {
          // // 进行登录
          // this.$http.post(
          //   'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //   this.loginForm
          // ).then(res => {
          //   // 登录成功
          //   // res 响应对象 res.data 是响应体
          //   // 存储用户信息
          //   store.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(e => {
          //   // e 错误对象
          //   this.$message.error('手机号或验证码有误')
          // })

          // 使用try{}catch(e){}可以捕获和处理异常
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            // 存储用户信息
            // console.log(res)
            store.setUser(res.data.data)

            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码有误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
    // 全屏
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // cover 背景图尺寸(图片充满容器)
    background: url(../../assets/login_bg.jpg) no-repeat center / cover;
    .my-card {
        width: 400px;
        height: 330px;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        // background-color: #fff;
        img {
            display: block;
            width: 200px;
            margin: 0 auto 20px;
        }
    }
}
</style>
