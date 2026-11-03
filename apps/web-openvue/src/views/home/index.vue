<script setup lang="ts">
import { api } from '@/api';

const router = useRouter();

const quickStats = [
  { label: '总用户', value: '12,480', color: '#3B82F6' },
  { label: '今日访问', value: '3,256', color: '#22C55E' },
  { label: '活跃应用', value: '5', color: '#722ed1' },
  { label: '系统正常率', value: '99.9%', color: '#F59E0B' },
];

const quickActions = [
  { emoji: '📊', label: '仪表盘', path: '/dashboard' },
  { emoji: '👥', label: '用户管理', path: '/user' },
  { emoji: '🧩', label: '组件展示', path: '/components' },
  { emoji: '👤', label: '个人中心', path: '/profile' },
  { emoji: '⚙️', label: '系统设置', path: '/settings' },
  { emoji: '📖', label: '关于项目', path: '/about' },
];

const techStack = [
  { label: 'Vue 3.5', severity: 'success' },
  { label: 'OpenVue', severity: 'info' },
  { label: 'Vite 8', severity: 'warn' },
  { label: 'TypeScript 6', severity: undefined },
  { label: 'Pinia 3', severity: 'danger' },
  { label: 'Vue Router 4', severity: 'success' },
];
const displayedStats = ref(quickStats);
const loadError = ref('');

onMounted(async () => {
  try {
    const data = await api.analytics.dashboardStats();
    const values = [
      data.totalUsers,
      data.todayVisits,
      data.activeUsers,
      data.systemUptime,
    ];
    const labels = ['总用户', '今日访问', '活跃用户', '系统正常率'];
    displayedStats.value = quickStats.map((item, index) => ({
      ...item,
      label: labels[index] ?? '统计',
      value:
        index === 3
          ? `${values[index]}%`
          : (values[index] ?? 0).toLocaleString(),
    }));
  } catch {
    loadError.value = '首页统计暂时无法更新，当前显示内置示例';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert">{{ loadError }}</p>
  <div style="padding: 24px; margin-bottom: 24px">
    <!-- Welcome Section -->
    <h2 style="margin-bottom: 8px">欢迎回来</h2>
    <p style="margin-bottom: 16px; color: #888">
      基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
    </p>
    <Divider />

    <!-- Quick Stats Row -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      "
    >
      <Card
        v-for="stat in displayedStats"
        :key="stat.label"
        style="border-left: 4px solid"
        :style="{ borderLeftColor: stat.color }"
      >
        <template #content>
          <div style="text-align: center">
            <div
              :style="{
                color: stat.color,
                fontSize: '28px',
                fontWeight: 'bold',
              }"
            >
              {{ stat.value }}
            </div>
            <div style="margin-top: 8px; color: #666">{{ stat.label }}</div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <template #title>快捷操作</template>
      <template #content>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          "
        >
          <Card
            v-for="action in quickActions"
            :key="action.label"
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <template #content>
              <div style="font-size: 32px">{{ action.emoji }}</div>
              <div style="margin-top: 8px">{{ action.label }}</div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <!-- Tech Stack -->
    <Card style="margin-top: 24px">
      <template #title>技术栈</template>
      <template #content>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <Tag
            v-for="tech in techStack"
            :key="tech.label"
            :value="tech.label"
            :severity="tech.severity"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
