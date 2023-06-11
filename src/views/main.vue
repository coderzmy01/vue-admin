<script setup>
import AsideCpnt from './cpnts/aside.vue';
import HeaderCpnt from './cpnts/header.vue';

</script>
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <aside-cpnt></aside-cpnt>
      <el-container>
        <header-cpnt></header-cpnt>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}

.common-layout {
  height: 100%;


  &>.el-container {
    height: 100%;

    &>.el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>