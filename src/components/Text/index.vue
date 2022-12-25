<template>
  <!-- 主体内容 -->
  <div
    class="main"
    style="position: absolute; left: 50%; transform: translateX(-50%)"
  >
    <div class="w">
      <!-- 文章列表 -->
      <div class="list article_list">
        <!-- 文章详情 -->
        <div class="article">
          <!-- 面包屑导航 -->
          <div class="crumbs_Nav">
            <span class="layui-breadcrumb">
              <a href="javascript:;"><i class="iconfont icon-shouye"></i></a>
              <a href="javascript:;"
                ><i class="iconfont icon-zhuti1" style="font-size: 13px"></i
              ></a>
              <a href="javascript:;"><i class="iconfont icon-yuandaima"></i></a>
              <a
                ><cite style="font-style: normal"
                  ><i class="iconfont icon-shouye1"></i></cite
              ></a>
            </span>
            <hr />
          </div>
          <!-- 文章内容 -->
          <div class="article_Info">
            <h1>🎉{{ text.title }}</h1>
            <img
              style="
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                width: 600px;
              "
              src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c595a7cbf2734883a7f3aa37639a6ab5~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?"
              alt=""
            />
            <h2>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ text.desc }}
            </h2>
            <p>
              {{ text.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Text",
  data() {
    return {
      text: this.$route.query.item,
    };
  },
};
</script>

<style scoped>
</style>