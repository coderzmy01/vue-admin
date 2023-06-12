<script setup>
const tableData = [
  {
    name: "oppo",
    todayBuy: 500,
    monthBuy: 3500,
    totalBuy: 22000,
  },
  {
    name: "vivo",
    todayBuy: 300,
    monthBuy: 2200,
    totalBuy: 24000,
  },
  {
    name: "苹果",
    todayBuy: 800,
    monthBuy: 4500,
    totalBuy: 65000,
  },
  {
    name: "小米",
    todayBuy: 1200,
    monthBuy: 6500,
    totalBuy: 45000,
  },
  {
    name: "三星",
    todayBuy: 300,
    monthBuy: 2000,
    totalBuy: 34000,
  },
  {
    name: "魅族",
    todayBuy: 350,
    monthBuy: 3000,
    totalBuy: 22000,
  },
];
const tableLabel = {
  name: "手机型号",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
};
</script>
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="user-info">
            <div class="name">Admin</div>
            <div class="role">超级管理员</div>
          </div>
        </div>
        <div class="login-info">
          <div>上次登录时间：<span>time</span></div>
          <div>上次登录地点：<span>location</span></div>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    .name {
      font-size: 28px;
      font-weight: 700;
    }
    .role {
      margin-top: 10px;
      font-size: 15px;
      color: #d5d5d5;
    }
  }
}
.login-info {
  line-height: 25px;
  font-size: 14px;
  color: #ccc;
  span {
    margin-left: 65px;
  }
}
</style>
