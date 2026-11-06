<script setup lang="ts">
import { useToast } from 'openvue/usetoast';
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
  <section class="component-gallery" aria-labelledby="component-gallery-title">
    <header class="component-gallery__heading">
      <h1 id="component-gallery-title">组件展示</h1>
      <p>试用常见控件，查看表单、表格和操作反馈在实际界面中的表现。</p>
    </header>
    <Card>
      <template #title> 按钮 Button </template>
      <template #content>
        <div class="component-gallery__samples">
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
        <div class="component-gallery__samples">
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
        <div class="component-gallery__controls mb-4">
          <InputText
            v-model="inputVal"
            placeholder="请输入内容"
            class="component-gallery__control"
          />
          <Select
            v-model="selectVal"
            :options="options"
            option-label="label"
            option-value="value"
            placeholder="请选择"
            class="component-gallery__control"
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
      <template #title> 通知反馈 </template>
      <template #content>
        <div class="component-gallery__samples">
          <Button
            label="成功消息"
            @click="
              toast.add({
                severity: 'success',
                summary: '操作成功！',
                life: 2000,
              })
            "
          />
          <Button
            label="警告消息"
            severity="warn"
            @click="
              toast.add({ severity: 'warn', summary: '请注意！', life: 2000 })
            "
          />
        </div>
      </template>
    </Card>
    <Card class="component-gallery__wide">
      <template #title> 表格 DataTable </template>
      <template #content>
        <div
          class="component-gallery__table"
          role="region"
          aria-label="表格示例"
          tabindex="0"
        >
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
        </div>
      </template>
    </Card>
  </section>
</template>
