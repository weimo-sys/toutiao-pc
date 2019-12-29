<template>
  <el-container class="container-home">
    <!-- 宽度属性绑定 展开 收起 -->
    <el-aside :width="isOpen? '200px' : '64px'">
      <!-- logo 区域 -->
      <div class="logo" :class="{minlogo: !isOpen}"></div>
      <!-- 菜单区域 -->
      <el-menu
        default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleAside"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 start-->
        <el-dropdown class="my-dropdown" @command="handle">
          <span class="el-dropdown-link">
            <img class="user-icon" :src="photo" alt />
            <span class="user-name">{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 分别用两种方法实现了个人设置和退出程序  @click.native   command="setting"-->
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出程序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 下拉菜单 end-->
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入store模块
import store from '@/store'
export default {
  data () {
    return {
      // 表示做菜单默认展开
      isOpen: true,
      // 用户名
      name: '',
      // 头象
      photo: ''
    }
  },
  created () {
    // 当组件创建成功的时候，从本地获取值，设置给用户名，头像赋值
    const user = store.getUser()
    console.log(user)
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleAside () {
      // 切换侧边栏
      this.isOpen = !this.isOpen
      // 宽度 logo 导航菜单组件
    },
    // 个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      // 清除本地用户信息
      store.delUser()
      // 跳转
      this.$router.push('/login')
    },
    handle (command) {
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.container-home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #102233;
    // logo
    .logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
    .minlogo {
      background: url(../../assets/logo_admin_01.png) no-repeat center / 40px
        auto;
    }
    .el-menu {
      border: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
  .icon {
    font-size: 24px;
    vertical-align: middle;
  }
  .text {
    font-size: 16px;
    vertical-align: middle;
  }
  .my-dropdown {
    float: right;
    .user-icon {
      width: 30px;
        height: 30px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .user-icon {
      vertical-align: middle;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
