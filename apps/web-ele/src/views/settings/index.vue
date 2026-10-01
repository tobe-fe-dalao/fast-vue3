<script setup lang="ts">
import { ElMessage } from 'element-plus';

const form = reactive({
  siteName: 'Fast Vue3',
  icp: '',
  logoText: 'FV3',
  pageSize: 20,
  language: 'zh-CN',
  enableRegister: true,
  enableWatermark: false,
  enableDarkMode: true,
});

function handleSave() {
  ElMessage.success('设置已保存');
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <el-card shadow="never" class="mb-4">
      <template #header>
        <span style="font-weight: 600">基础设置</span>
      </template>
      <el-form :model="form" label-width="100px">
        <el-form-item label="站点名称">
          <el-input v-model="form.siteName" />
        </el-form-item>
        <el-form-item label="ICP 备案号">
          <el-input v-model="form.icp" placeholder="选填" />
        </el-form-item>
        <el-form-item label="Logo 文字">
          <el-input v-model="form.logoText" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="mb-4">
      <template #header>
        <span style="font-weight: 600">功能开关</span>
      </template>
      <el-form :model="form" label-width="100px">
        <el-form-item label="开放注册">
          <el-switch v-model="form.enableRegister" />
        </el-form-item>
        <el-form-item label="全局水印">
          <el-switch v-model="form.enableWatermark" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch v-model="form.enableDarkMode" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="mb-4">
      <template #header>
        <span style="font-weight: 600">偏好设置</span>
      </template>
      <el-form :model="form" label-width="100px">
        <el-form-item label="默认分页">
          <el-select v-model="form.pageSize">
            <el-option :value="10" label="10 条/页" />
            <el-option :value="20" label="20 条/页" />
            <el-option :value="50" label="50 条/页" />
          </el-select>
        </el-form-item>
        <el-form-item label="系统语言">
          <el-select v-model="form.language">
            <el-option value="zh-CN" label="简体中文" />
            <el-option value="en" label="English" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-button type="primary" @click="handleSave">保存设置</el-button>
  </div>
</template>
