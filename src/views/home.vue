<script setup>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from "vue";
import { getTableData, getCountData, getEchartsData } from "../api/home";
import * as echarts from "echarts";
const { proxy } = getCurrentInstance();
const tableLabel = {
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
};
const tableDataTest = ref([]);
const countData = ref([]);
let orderData = reactive({ xData: [], series: [] });
let userData = reactive({ xData: [], series: [] });
let videoData = reactive({ series: [] });
let xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
let pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
function renderEchart(chartData, chartOptions, chartRef) {
  const { xData, series } = toRefs(chartData);
  if (xData) {
    chartOptions.xAxis.data = xData;
  }
  chartOptions.series = series;
  const chart = echarts.init(proxy.$refs[chartRef]);
  chart.setOption(chartOptions);
}
const fetchTableData = async () => {
  const res = await getTableData();
  tableDataTest.value = res.tableData;
};
const fetchCountData = async () => {
  const res = await getCountData();
  countData.value = res.countData;
};
const fetchEchartsData = async () => {
  const res = await getEchartsData();
  let orderRes = res.orderData;
  let userRes = res.userData;
  let videoRes = res.videoData;
  // 处理orderData的配置项
  orderData.xData = orderRes.date;
  const keyArray = Object.keys(orderRes.data[0]);
  const series = [];
  keyArray.forEach((key) => {
    series.push({
      name: key,
      data: orderRes.data.map((item) => item[key]),
      type: "line",
    });
  });
  orderData.series = series;
  userData.xData = userRes.map((item) => item.date);
  userData.series = [
    {
      name: "新增用户",
      data: userRes.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userRes.map((item) => item.active),
      type: "bar",
    },
  ];
  videoData.series = [
    {
      data: videoRes,
      type: "pie",
    },
  ];
  renderEchart(orderData, xOptions, "Oechart");
  renderEchart(videoData, pieOptions, "Vechart");
  renderEchart(userData, xOptions, "Uechart");
};
onMounted(() => {
  fetchTableData();
  fetchCountData();
  fetchEchartsData();
});
</script>
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 15px">
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
        <el-table :data="tableDataTest" stripe>
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 15px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>

          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="Oechart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 250px">
          <div ref="Uechart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 250px">
          <div ref="Vechart" style="height: 240px"></div>
        </el-card>
      </div>
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
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 10px;

    .icons {
      width: 80px;
      height: 80px;
      line-height: 30px;
      color: #fff;
    }
    .detail {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .num {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      .txt {
        font-size: 12px;
        text-align: center;
        color: #999;
      }
    }
  }
}
.graph {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
