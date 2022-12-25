<template>
  <!-- 主体内容 -->
  <div class="main">
    <div class="w">
      <!-- 文章列表 -->
      <div class="list home_list">
        <!-- 列表 -->
        <ul v-for="(item, index) in textList" :key="index">
          <li>
            <!-- 文章缩略图 -->
            <div class="left">
              <router-link :to="{ path: 'text', query: { item: item } }">
                <img
                  src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c595a7cbf2734883a7f3aa37639a6ab5~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?"
                  alt=""
              /></router-link>
            </div>

            <!-- 文章内容 -->
            <div class="right">
              <!-- 文章标题 -->
              <h2>
                <router-link :to="{ path: 'text', query: { item: item } }">{{
                  item.title
                }}</router-link>
              </h2>

              <!-- 文章摘要 -->
              <p class="list-length" style="margin: 0">
                {{ item.desc }}
              </p>

              <!-- 文章信息 -->
              <div class="meta">
                <div>
                  <!-- 文章点赞数 -->
                  <a href="javascript:;"
                    ><i class="iconfont icon-dianzan"></i
                    ><el-badge :value="item.id * 10" class="item">
                      <el-button size="small">评论</el-button>
                    </el-badge></a
                  >
                  <!-- 文章浏览量 -->
                  <a href="javascript:;"
                    ><i class="iconfont icon-huo"></i
                    ><el-badge :value="item.id * 3" class="item">
                      <el-button size="small">回复</el-button>
                    </el-badge></a
                  >
                  <!-- 文章发布时间 -->
                  <a href="javascript:;" style="line-height: 20px"
                    ><i class="iconfont icon-shijian"></i>2022-4-23
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- 加载列表 -->
        <div class="loadList">
          <i class="iconfont icon-loadm"></i>
          <span>加载更多</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
<script>
export default {
  data() {
    return {
      textList: [], // 所有文章
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      // 调用post请求
      const { data: res } = await this.$http.get("/allwenzhang");
      console.log(res, "data");
      this.textList = res; // 将返回数据赋值
      console.log(this.textList, "首页数据");
    },
  },
};
</script>