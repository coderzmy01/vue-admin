<script setup>
import HeaderCpnt from './cpnts/header.vue';


</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header
          <header-cpnt></header-cpnt>
        </el-header>
        <el-main>
          <el-icon :size="size" :color="color">
            <Edit />
          </el-icon>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped></style>