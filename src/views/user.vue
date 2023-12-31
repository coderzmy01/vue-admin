<script setup>
import { onMounted, ref, reactive, getCurrentInstance, computed } from "vue";
import {
  getUserInfo,
  createUserInfo,
  updateUserInfo,
  DeleteUserInfo,
} from "../api/user";
import dayjs from "dayjs";
const { proxy } = getCurrentInstance();
const userList = ref([]);
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 320,
  },
]);
const config = reactive({
  page: 1,
  total: 0,
  name: "",
});
const formInline = reactive({
  keyword: "",
});
const dialogVisible = ref(false);
const formUser = reactive({
  name: "", // 添加用户的 用户名
  age: "",
  sex: "",
  birth: "",
  addr: "",
});
const action = ref("add");
const title = computed(() => {
  return action.value === "add" ? "新增" : "编辑";
});
const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      proxy.$refs.userForm.resetFields();
      done();
    })
    .catch(() => {
      // catch error
    });
};
const fetchUserInfo = async (config) => {
  let res = await getUserInfo(config);
  console.log(res);
  config.total = res.count;
  userList.value = res.list.map((item) => {
    item.sexLabel = item.sex === 1 ? "男" : "女";
    item.birth = dayjs(item.birth).format("YYYY-MM-DD");
    return item;
  });
  // console.log(userList.value);
};

const changePage = (page) => {
  config.page = page;
  fetchUserInfo(config);
};
const handleSearch = () => {
  config.name = formInline.keyword;
  fetchUserInfo(config);
};
const onSubmit = () => {
  proxy.$refs.userForm.validate(async (valid) => {
    if (valid) {
      if (action.value === "add") {
        const res = await createUserInfo(formUser);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          fetchUserInfo(config);
        }
      } else {
        formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
        const res = await updateUserInfo(formUser);
        if (res) {
          console.log(formUser);
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          fetchUserInfo(config);
        }
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      });
    }
  });
};
const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs.userForm.resetFields();
};
const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};
const handleEdit = (item) => {
  action.value = "edit";
  dialogVisible.value = true;
  // console.log(item);
  item.sex = item.sexLabel;
  // Object.assign(formUser, item);
  proxy.$nextTick(() => {
    Object.assign(formUser, item);
    console.log(formUser);
  });
};
const handleDelete = (item) => {
  ElMessageBox.confirm("这将会永久删除该条目，确定吗？", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      const res = await DeleteUserInfo(item);
      // console.log(res);
      fetchUserInfo(config);
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
onMounted(() => {
  fetchUserInfo(config);
});
</script>
<template>
  <!-- <h1>user for test</h1> -->
  <div class="search">
    <el-button type="primary" @click="handleAdd">新增表单</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="输入查询关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="userList" stripe border style="width: 100%" height="480px">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in tableLabel"
        :key="item.prop"
        :width="item.width ? item.width : 125"
      /><el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="page"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="`${title}表单`"
    width="40%"
    :before-close="handleClose"
  >
    <el-form :model="formUser" label-width="120px" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '姓名是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              { required: true, message: '年龄是必填项' },
              { type: 'number', message: '年龄必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必选项' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[{ required: true, message: '地址是必填项' }]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<style lang="less" scoped>
.search {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 540px;
  .page {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
