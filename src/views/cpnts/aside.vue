<script setup>
const list = [
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];
const noChild = () => list.filter((item) => !item.children);
const hasChild = () => list.filter((item) => item.children);
</script>
<template>
  <el-aside :width="$store.state.isCollapse ? '80px' : '200px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color=" #545c64"
      text-color="#fff"
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in noChild()"
        :key="item.path"
      >
        <component :is="item.icon" class="icons"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChild()"
        :key="item.path"
      >
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="iten.path"
            v-for="(iten, index) in item.children"
            :key="index"
          >
            <component :is="iten.icon" class="icons"></component>
            <span>{{ iten.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu></el-aside
  >
</template>
<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}

.el-menu {
  border-right: 0;
}
</style>
