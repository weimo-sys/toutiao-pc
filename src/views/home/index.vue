<template>
  <el-container class="container-home">
    <!-- 宽度属性绑定 展开 收起 -->
    <el-aside :width="isOpen? '200px' : '64px'">
      <!-- logo 区域 -->
      <div class="logo" :class="{minlogo: !isOpen}"></div>
      <!-- 菜单区域 -->
      <el-menu
        default-active="/"
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
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../../assets/avatar.jpg" alt />
            <span>用户名</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出程序</el-dropdown-item>
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
export default {
  data () {
    return {
      // 表示做菜单默认展开
      isOpen: true
    }
  },
  methods: {
    toggleAside () {
      // 切换侧边栏
      this.isOpen = !this.isOpen
      // 宽度 logo 导航菜单组件
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
  .el-dropdown {
    float: right;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      vertical-align: middle;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
