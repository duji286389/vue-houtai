<template>
  <el-container class="home-container">
    <!--头部布局-->
    <el-header>
      <div>
        <img src="../assets/qq.png" alt class="logo_img" />
        <span>文章管理系统</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <el-container>
      <!--侧边布局-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--伸缩按钮-->
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <!--侧边栏菜单区 unique-opened="true" 只保持一个菜单展开 router开启路由 active-text-color 颜色-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <el-submenu index="1">
            <!-- 一级导航栏 -->
            <template slot="title">
              <i class="iconfont icon-daohanglanmoshi02"></i>
              <span>一级导航栏</span>
            </template>
            <!-- 二级导航栏 -->
            <el-menu-item
              v-for="(item, index) in this.menuList"
              @click="saveNavState(item.path)"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体布局-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 左侧菜单
      menuList: [],
      obj: {},
      iconsObject: {
        user: "iconfont icon-yonghu",
        product: "iconfont icon-chanpin",
      },
      isCollapse: false,
      // 被激活的连接
      activePath: "",
    };
  },
  // 类似onload
  created() {
    this.getMenuList();
    // this.activePath = window.sessionStorage.getItem("activePath"); // 取出session里的访问路径
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的导航菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("/getmenu");
      this.menuList = res;
      // if (res.status != 200) return this.$message.error("操作失败！！！");
      // this.menuList = res.data;
    },
    // 切换菜单折叠与展开
    toggleCollapase() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存二级菜单的路径
    saveNavState(path) {
      // window.sessionStorage.setItem("activePath", activePath); // 存放点击的二级菜单
      console.log(path);
      // this.activePath = activePath; // 给点击的菜单添加高亮
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
// 头部样式
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; // 左右贴边
  padding-left: 0%; // 左边界
  align-items: center; // 水平
  color: #fff;
  font-size: 20px;
  > div {
    //左侧div加布局
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
// 侧边样式
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none; // 对其右边框
  }
}
// 主体样式
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.logo_img {
  width: 20%;
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; // 显示鼠标指针为：小手
}
</style>