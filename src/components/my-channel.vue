 <template>
  <!-- select 选择器 -->
  <el-select :value="value" @change="changeChannel" clearable placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 选择后的频道id
      channelId: null,
      // 频道选项
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 频道选择处理函数
    changeChannel (channelId) {
      // if (this.channelId === '') this.channelId = null
      if (channelId === '') channelId = null
      // 把选择的频道传递给父组件  父组件去修改数据
      this.$emit('input', channelId)
    },
    // 获取频道的选项数据
    // 原始数据 res = {data: {message: '', data: {channels: []}}}
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
