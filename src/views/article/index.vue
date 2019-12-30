<template>
  <div class="container-article">
    <el-card class="box-card">
      <!-- 头部区域  面包屑 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容区域 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- select 选择器 -->
          <el-select v-model="filterParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <!-- 时间日期选择器 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">筛选</el-button>
        </el-form-item>

      </el-form>
    </el-card>
    <!-- 使用插槽 -->
    <!-- <my-page>默认插槽</my-page> -->
    <!-- 后备内容 -->
    <!-- <my-page></my-page> -->
    <my-page>
      <!-- <div slot="content">内容</div> -->
      <!-- 作用域插槽 -->
      <!-- slot 定义插槽名称    -->
      <!-- slot-scop指定接收插槽上的所有数据的对象名称为scope {msg：'',age:} -->
      <!-- <div slot="footer" slot-scope="scope">底部---{{scope.msg}}</div> -->
      <template v-slot:footer="scope">底部---{{scope.msg}}</template>
    </my-page>
  </div>
</template>

<script>
// 插槽测试
import MyPage from '@/test/my-page'
export default {
  // 私有组件
  components: { MyPage },
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        // 如果不传当值位null
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      // 日期选择后的数组（起始日期，结束日期）
      dateArr: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
