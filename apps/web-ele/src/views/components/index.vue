<script setup lang="ts">
import { ElMessage, ElNotification } from 'element-plus';
const loading = ref(false);
function triggerLoading() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
  }, 1500);
}
const inputVal = ref('');
const selectVal = ref('');
const switchVal = ref(true);
const progress = ref(60);
const options = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
  { label: '选项C', value: 'c' },
];
const tableData = [
  { name: '张三', role: 'Admin', dept: '技术部', status: '在职' },
  { name: '李四', role: 'Editor', dept: '产品部', status: '在职' },
  { name: '王五', role: 'Viewer', dept: '运营部', status: '离职' },
  { name: '赵六', role: 'Guest', dept: '市场部', status: '在职' },
];
</script>
<template>
  <div class="components-page">
    <el-card header="按钮 Button" shadow="never">
      <el-space wrap>
        <el-button>默认</el-button><el-button type="primary"> 主要 </el-button>
        <el-button type="success"> 成功 </el-button
        ><el-button type="warning"> 警告 </el-button>
        <el-button type="danger"> 危险 </el-button
        ><el-button :loading="loading" type="primary" @click="triggerLoading">
          加载中
        </el-button>
      </el-space>
    </el-card>
    <el-card header="标签 Tag" shadow="never">
      <el-space wrap>
        <el-tag>默认</el-tag><el-tag type="success"> 成功 </el-tag>
        <el-tag type="info"> 信息 </el-tag><el-tag type="warning"> 警告 </el-tag
        ><el-tag type="danger"> 危险 </el-tag>
      </el-space>
    </el-card>
    <el-card header="表单 Form" shadow="never">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input v-model="inputVal" placeholder="请输入内容" clearable />
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="selectVal"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="o in options"
              :key="o.value"
              :label="o.label"
              :value="o.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-switch v-model="switchVal" />
        </el-col>
      </el-row>
      <el-row :gutter="16" class="mt-4">
        <el-col :span="12">
          <el-progress :percentage="progress" />
        </el-col>
        <el-col :span="12">
          <el-slider v-model="progress" />
        </el-col>
      </el-row>
    </el-card>
    <el-card header="表格 Table" shadow="never">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" /><el-table-column
          prop="role"
          label="角色"
        />
        <el-table-column prop="dept" label="部门" /><el-table-column
          prop="status"
          label="状态"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === '在职' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card header="反馈 Feedback" shadow="never">
      <el-space>
        <el-button @click="ElMessage.success('操作成功')"> 成功提示 </el-button>
        <el-button @click="ElMessage.warning('请注意！')"> 警告提示 </el-button>
        <el-button @click="ElMessage.error('出错了！')"> 错误提示 </el-button>
        <el-button
          @click="
            ElNotification({
              title: '通知',
              message: '这是一条通知消息',
              type: 'info',
            })
          "
        >
          通知
        </el-button>
      </el-space>
    </el-card>
  </div>
</template>

<style scoped>
.components-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 8px;
}

@media (max-width: 767px) {
  .components-page {
    padding: 0;
  }
}
</style>
