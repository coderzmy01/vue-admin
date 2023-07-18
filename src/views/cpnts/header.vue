<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
let getImageUrl = (user) => {
  return new URL(`../../assets/images/${user}.png`, import.meta.url).href;
};
const router = useRouter();
const store = useStore();
const curBreadItem = computed(() => {
  return store.state.currentBread;
});
const handleCollapseClick = () => {
  store.commit("updateCollapse");
};
const handelLogout = () => {
  store.commit("clearMenu");
  store.commit("clearToken");
  router.push({ name: "login" });
};
</script>
<template>
  <!-- <h1>header组件封装</h1> -->
  <el-header>
    <div class="el-l">
      <el-button size="small" plain @click="handleCollapseClick">
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="curBreadItem.path" v-if="curBreadItem">{{
          curBreadItem.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="el-r">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handelLogout">登出</el-dropdown-item>
            <el-dropdown-item>登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  width: 100%;

  .el-l {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 10px;
    }

    .el-breadcrumb {
      :deep(span) {
        color: #fff !important;
        cursor: pointer !important;
      }
    }
  }

  .el-r {
    .el-dropdown-link {
      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // vertical-align: middle;
      }
      .el-icon--right {
        color: #fff !important;
      }
    }
  }
}
</style>
