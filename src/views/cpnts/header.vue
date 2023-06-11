<script setup>
import { useStore } from "vuex";
let getImageUrl = (user) => {
  return new URL(`../../assets/images/${user}.png`, import.meta.url).href;
};
const store = useStore();
const handleCollapseClick = () => {
  console.log("test");
  store.commit("updateCollapse");
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
      <h3>首页</h3>
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
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
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

    h3 {
      color: #fff;
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
    }
  }
}
</style>
