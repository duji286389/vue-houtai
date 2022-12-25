<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!-- 搜索添加 -->
          <el-input
            placeholder="请输入搜索内容"
            v-model="serachwen"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getqueryUser"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加文章</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="文章标题"
          prop="title"
          min-width="24%"
        ></el-table-column>
        <el-table-column
          label="文章作者"
          prop="author"
          min-width="24%"
        ></el-table-column>
        <el-table-column
          label="文章描述"
          prop="desc"
          min-width="24%"
        ></el-table-column>
        <el-table-column label="文章内容" prop="text"> </el-table-column>

        <el-table-column label="操作" min-width="30%">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <!-- 收藏 -->
            <el-button
              type="warning"
              icon="el-icon-star-off"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 100]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 创建新用户对话框 -->
    <el-dialog
      title="添加文章"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <!-- 商品名称 -->
        <el-form-item label="文章名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="文章作者" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="文章描述" prop="num">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <!-- 商品图片 -->

        <el-form-item label="文章内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="255"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改文章"
      :visible.sync="editDialogVisible"
      width="50%"
      @colse="editDialogClosed"
    >
      <el-form
        :model="this.editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <!-- 用户名 -->
        <el-form-item label="产品名称" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="产品价格" prop="author">
          <el-input v-model="editForm.author"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="商品数量" prop="desc">
          <el-input v-model="editForm.desc"></el-input>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="文章内容" prop="text">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="editForm.text"
            maxlength="255"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Product",
  data() {
    return {
      textarea: "",
      edittext: "",
      // 请求数据
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },
      userlist: [], // 用户列表
      total: 0, // 最大数据记录
      addDialogVisible: false, // 对话框显示
      // 添加用户表单项
      addForm: {
        name: "",
        price: "",
        num: "",
        url: "",
      },
      // 控制修改用户对话框显示/隐藏
      editDialogVisible: false,
      // 修改用户信息
      editForm: {},
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //查询文章
    async getqueryUser() {
      console.log(this.queryUser);
      // 调用post请求
      const { data: res } = await this.$http.get(
        `/serachwenzhang?title=${this.queryUser}`
      );
      this.userlist = res; // 将返回数据赋值
      this.total = res.length; // 总个数
    },
    async getUserList() {
      // 调用post请求
      const { data: res } = await this.$http.get("/allwenzhang");
      console.log(res, "data");
      this.userlist = res; // 将返回数据赋值
      this.total = res.length; // 总个数
    },
    // 监听pageSize改变的事件
    async handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      const { data: res } = await this.$http.get(
        `/loadwenzhang?newPage=${this.queryInfo.pageNum}&pageSize=${this.queryInfo.pageSize}`
      );
      this.userlist = res; // 将返回数据赋值
    },
    // 监听pageNum改变的事件
    async handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      const { data: res } = await this.$http.get(
        `/loadwenzhang?newPage=${this.queryInfo.pageNum}&pageSize=${this.queryInfo.pageSize}`
      );
      this.userlist = res; // 将返回数据赋值
      // this.total = res.length; // 总个数
    },
    // 修改文章
    async userStateChanged(userinfo) {
      console.log(userinfo.state);
      const { data: res } = await this.$http.get(
        `productState?id=${userinfo.id}&state=${userinfo.state}`
      );
      if (res != "success") {
        userinfo.state = !userinfo.state;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    // 监听添加用户
    addDialogClosed() {
      this.$refs.addFormRef.resetFields(); // 重置表单项
    },
    // 添加文章
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起请求
        const { data: res } = await this.$http.get(
          `addwenzhang?title=${this.addForm.name}&author=${this.addForm.price}&desc=${this.addForm.num}&text=${this.textarea}`
        );
        if (res != "success") {
          userinfo.state = !userinfo.state;
          return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        this.addForm.url = "";
        //隐藏
        this.addDialogVisible = false;
        this.getUserList();
      });
    },
    // 展示修改框
    async showEditDialog(id) {
      this.editDialogVisible = true;
      const { data: res } = await this.$http.get("getwenzhangid?id=" + id);
      this.editForm = res;
      console.log(this.editForm, "updata");
    },
    // 关闭窗口
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 确认修改
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid, "修改按钮");
        if (!valid) return;
        // 发起请求
        console.log("123修改了", this.editForm);
        let title = this.editForm.title;
        let author = this.editForm.author;
        let desc = this.editForm.desc;
        let text = this.editForm.text;
        let id = this.editForm.id;
        const { data: res } = await this.$http.get(
          `editwenzhang?title=${title}&author=${author}&desc=${desc}&text=${text}&id=${id}`
        );
        if (res != "success") return this.$message.error("操作失败！！！");
        this.$message.success("操作成功！！！");
        //隐藏
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
    // 删除按钮
    async deleteUser(id) {
      // 弹框
      const confirmResult = await this.$confirm(
        "此操作将永久删除此文章, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 成功删除为confirm 取消为 cancel

      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.get("deletewenzhang?id=" + id);
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.getUserList();
    },
  },
};
</script>
<style lang="less" scoped>
</style>