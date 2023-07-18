<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UsrLogin } from "../api/user.js";
const store = useStore();
const router = useRouter();
const loginForm = reactive({
  username: "admin",
  password: "admin",
});
const loginTap = async () => {
  const res = await UsrLogin(loginForm);
  // console.log(res);
  store.commit("setMenu", res.menu);
  store.commit("addMenu", router);
  store.commit("setToken", res.token);
  router.push("/");
};
</script>
<template>
  <el-form style="max-width: 460px" class="login-container" v-model="loginForm">
    <h3>系统登录</h3>
    <el-form-item label="账号">
      <el-input
        type="input"
        placeholder="请输入账号"
        v-model="loginForm.username"
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="loginForm.password"
      />
    </el-form-item>
    <el-form-item class="loginBtn">
      <el-button type="primary" @click="loginTap">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="less" scoped>
.login-container {
  margin: 180px auto;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
