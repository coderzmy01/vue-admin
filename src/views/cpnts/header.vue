<script setup>
let getImageUrl = (user) => {
  return new URL(`../../assets/images/${user}.png`, import.meta.url).href
}
</script>
<template>
  <!-- <h1>header组件封装</h1> -->
  <div class="header-common">
    <div class="el-l">
      <el-button size="small" plain>
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
    </div>
    <div class="el-r">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user">
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
  </div>
</template>
<style lang="less" scoped>
.header-common {
  display: flex;
  justify-content: space-between;
  align-items: center;

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