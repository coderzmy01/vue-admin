<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const router = useRouter();
const tabList = computed(() => store.state.tabsList);
console.log(tabList.value);
const changeMenu = (item) => {
  router.push({ name: item.name });
};
const handleClose = (item, index) => {
  const length = tabList.value.length - 1;
  store.commit("closeTag", item);
  if (item.name !== route.name) {
    return;
  }
  if (index === length) {
    // console.log(tabList.value);
    // console.log(tabList[index - 1].name);
    router.push({ name: tabList.value[index - 1].name });
  } else {
    router.push({ name: tabList.value[index].name });
    // console.log(tabList.value[index]);
  }
};
</script>
<template>
  <div class="tab">
    <el-tag
      v-for="(item, index) in tabList"
      :key="item.name"
      :closable="item.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      >{{ item.label }}</el-tag
    >
  </div>
</template>
<style lang="less" scoped>
.tab {
  padding: 10px;
  width: 100%;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
