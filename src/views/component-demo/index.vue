<template>
  <Header />
  <div class="show dark:bg-slate-900">
    <a-descriptions title="Ant Design Vue" />
    <a-space>
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="link">Link Button</a-button>
    </a-space>

    <a-descriptions title="Element Plus" />
    <el-space>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-space>

    <a-descriptions title="Naive" />
    <n-space>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>

    <a-descriptions title="TDesign" />
    <t-space>
      <t-button theme="primary">填充按钮</t-button>
      <t-button variant="outline" theme="primary">描边按钮</t-button>
      <t-button variant="dashed" theme="primary">虚框按钮</t-button>
      <t-button variant="text" theme="primary">文字按钮</t-button>
    </t-space>
  </div>
</template>

<script setup lang="ts">
  import Header from '/@/components/Header/index.vue';
</script>

<style lang="less" scoped>
  .show {
    padding: 20px;
    height: 100vh;
  }

  :deep(.ant-descriptions) {
    margin-top: 40px;

    &-header {
      margin-bottom: 10px;
    }

    &:first-of-type {
      margin-top: 0;
    }
  }

  html.dark {
    .show {
      :deep(.ant-descriptions-title) {
        color: white !important;
      }
    }
  }
</style>
