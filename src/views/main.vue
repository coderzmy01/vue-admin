<script setup>
import AsideCpnt from './cpnts/aside.vue';
import HeaderCpnt from './cpnts/header.vue';

</script>
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <aside-cpnt></aside-cpnt>
      <el-container class="r-container">
        <el-header>
          <header-cpnt></header-cpnt>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped></style>