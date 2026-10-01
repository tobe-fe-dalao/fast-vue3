<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const loading = ref(false);
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
function triggerLoading() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    toast.add({
      severity: 'success',
      summary: '完成',
      detail: '操作成功',
      life: 2000,
    });
  }, 1500);
}
</script>
<template>
  <div class="components-page">
    <Card>
      <template #title> 按钮 Button </template>
      <template #content>
        <div class="flex flex-wrap gap-2">
          <Button label="默认" severity="secondary" />
          <Button label="主要" />
          <Button label="成功" severity="success" />
          <Button label="警告" severity="warn" />
          <Button label="危险" severity="danger" />
          <Button label="加载中" :loading="loading" @click="triggerLoading" />
        </div>
      </template>
    </Card>
    <Card>
      <template #title> 标签 Tag </template>
      <template #content>
        <div class="flex flex-wrap gap-2">
          <Tag value="默认" /><Tag value="成功" severity="success" /><Tag
            value="信息"
            severity="info"
          /><Tag value="警告" severity="warn" /><Tag
            value="危险"
            severity="danger"
          />
        </div>
      </template>
    </Card>
    <Card>
      <template #title> 表单 Form </template>
      <template #content>
        <div class="flex gap-4 mb-4">
          <InputText
            v-model="inputVal"
            placeholder="请输入内容"
            class="flex-1"
          />
          <Select
            v-model="selectVal"
            :options="options"
            option-label="label"
            option-value="value"
            placeholder="请选择"
            class="flex-1"
          />
          <ToggleSwitch v-model="switchVal" />
        </div>
        <div>
          <div class="text-sm text-gray-500 mb-2">进度 {{ progress }}%</div>
          <ProgressBar :value="progress" class="mb-2" />
          <Slider v-model="progress" />
        </div>
      </template>
    </Card>
    <Card>
      <template #title> 表格 DataTable </template>
      <template #content>
        <DataTable :value="tableData" striped-rows>
          <Column field="name" header="姓名" /><Column
            field="role"
            header="角色"
          /><Column field="dept" header="部门" />
          <Column field="status" header="状态">
            <template #body="{ data }">
              <Tag
                :value="data.status"
                :severity="data.status === '在职' ? 'success' : 'secondary'"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <Toast />
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
