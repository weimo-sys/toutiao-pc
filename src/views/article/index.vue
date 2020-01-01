<template>
  <div class="container-article">
    <el-card class="box-card">
      <!-- 头部区域  面包屑 -->
      <div slot="header">
        <!-- 使用自己的面包屑组件（插槽） -->
        <my-bread>内容管理</my-bread>
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
          <!-- 封装成自己的频道组件 -->
           <!-- <my-channel :value="filterParams.channel_id" @input="filterParams.channel_id=$event"></my-channel> -->
          <my-channel v-model="filterParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <!-- 时间日期选择器 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change = "changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果区域 -->
    <el-card>
      <!-- 具名插槽 -->
      <div slot="header">根据筛选条件共查询到 {{ total }} 条结果</div>
      <!-- 使用表格（默认插槽） -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" alt=""> -->
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="delArticle(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        // 如果不传当值位null
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道选项
      // channelOptions: [],
      // 日期选择后的数组（起始日期，结束日期）
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 组件初始化（组件初始化后，获取数据）
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    toEdit (articleId) {
      this.$router.push(`/publish?id=${articleId}`)
    },
    // 删除文章
    async delArticle (articleId) {
      // 发生删除请求
      try {
        await this.$http.delete(`articles/${articleId}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (e) {
        console.log(e)
        this.$message.error('删除失败')
      }
    },

    // 日期选择处理函数
    changeDate (value) {
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    },
    // 搜索
    search () {
      // 每次搜索的时候 页码应该改成1
      this.filterParams.page = 1
      // 刷新页面
      this.getArticles()
    },
    // // 获取频道的选项数据
    // // 原始数据 res = {data: {message: '', data: {channels: []}}}
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.filterParams })
      this.articles = data.results
      console.log(this.articles[0].id.toString())
      // 总条数
      this.total = data.total_count
    },
    // 改变分页
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
