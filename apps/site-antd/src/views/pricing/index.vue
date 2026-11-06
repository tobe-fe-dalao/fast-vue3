<script setup lang="ts">
import type { PaymentChannel, PaymentOrder } from '@/api';

import { isLoggedIn } from '@fast-vue3/utils';

import { api } from '@/api';

const fallbackPlans = [
  {
    id: 1,
    name: '开源版',
    price: '免费',
    unit: '',
    desc: '面向个人与开源项目，完整的脚手架能力。',
    features: [
      '7 大 UI 框架模板',
      'Monorepo 工程结构',
      '后台 + 门户双模式',
      'CLI 快速创建',
      '社区支持',
    ],
    cta: '立即使用',
    highlight: false,
  },
  {
    id: 2,
    name: 'Pro 版',
    price: '¥199',
    unit: '/ 项目',
    desc: '面向团队，提供更多企业级模板与组件。',
    features: [
      '包含开源版全部能力',
      'Polyrepo 独立工程模板',
      '权限 / 内容管理模块',
      '暗色模式与主题定制',
      '邮件 + 文档支持',
    ],
    cta: '升级 Pro',
    highlight: true,
  },
  {
    id: 4,
    name: '企业版',
    price: '定制',
    unit: '',
    desc: '面向企业，提供私有部署与专属服务。',
    features: [
      '包含 Pro 版全部能力',
      '私有化部署方案',
      '专属架构咨询',
      '定制 UI 框架接入',
      'SLA 保障支持',
    ],
    cta: '联系我们',
    highlight: false,
  },
];

const plans = ref(fallbackPlans);
const router = useRouter();
const checkoutVisible = ref(false);
const paying = ref(false);
const selectedPlan = ref<(typeof fallbackPlans)[number] | null>(null);
const channel = ref<PaymentChannel>('alipay');
const order = ref<null | PaymentOrder>(null);
const paymentError = ref('');

function getPlanCta(planId: number) {
  if (planId === 1) return '立即使用';
  if (planId === 4) return '联系销售';
  return '立即购买';
}

function handlePlanAction(plan: (typeof fallbackPlans)[number]) {
  if (plan.id === 1) return router.push('/docs');
  if (plan.id === 4) return router.push('/contact');
  if (!isLoggedIn()) {
    return router.push({ path: '/login', query: { redirect: '/pricing' } });
  }
  selectedPlan.value = plan;
  order.value = null;
  paymentError.value = '';
  checkoutVisible.value = true;
}

async function handleCheckout() {
  if (!selectedPlan.value) return;
  paying.value = true;
  paymentError.value = '';
  try {
    order.value = await api.portal.checkout({
      channel: channel.value,
      planId: selectedPlan.value.id,
    });
  } catch (error) {
    paymentError.value =
      error instanceof Error ? error.message : '创建订单失败';
  } finally {
    paying.value = false;
  }
}

onMounted(async () => {
  try {
    const data = await api.portal.pricing();
    plans.value = data.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      unit: plan.period,
      desc: plan.description,
      features: plan.features,
      cta: getPlanCta(plan.id),
      highlight: plan.highlighted,
    }));
  } catch {
    // 保留内置数据，确保离线预览仍可用。
  }
});
</script>

<template>
  <div>
    <section class="site-hero site-hero--compact">
      <h1 class="site-hero-title">价格方案</h1>
      <p class="site-hero-desc">选择适合你的方案，从开源起步，随业务平滑升级</p>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="site-grid">
          <div
            v-for="(plan, i) in plans"
            :key="plan.name"
            v-reveal="i * 120"
            class="site-card plan-card"
            :class="{ 'plan-card--highlight': plan.highlight }"
          >
            <div v-if="plan.highlight" class="plan-badge">推荐</div>
            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="price-value">{{ plan.price }}</span>
              <span class="price-unit">{{ plan.unit }}</span>
            </div>
            <p class="plan-desc">{{ plan.desc }}</p>
            <AButton
              :type="plan.highlight ? 'primary' : 'default'"
              size="large"
              block
              class="plan-cta"
              @click="handlePlanAction(plan)"
            >
              {{ plan.cta }}
            </AButton>
            <ul class="plan-features">
              <li v-for="f in plan.features" :key="f">
                <span class="plan-check">✓</span>{{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <div
      v-if="checkoutVisible"
      class="checkout-mask"
      @click.self="checkoutVisible = false"
    >
      <div class="checkout-panel">
        <button
          class="checkout-close"
          type="button"
          @click="checkoutVisible = false"
        >
          ×
        </button>
        <h2>确认订单</h2>
        <template v-if="!order">
          <p class="checkout-summary">
            {{ selectedPlan?.name }} · {{ selectedPlan?.price }}
            {{ selectedPlan?.unit }}
          </p>
          <div class="payment-channels">
            <label
              ><input v-model="channel" type="radio" value="alipay" />
              支付宝</label
            >
            <label
              ><input v-model="channel" type="radio" value="wechat" />
              微信支付</label
            >
            <label
              ><input v-model="channel" type="radio" value="card" />
              银行卡</label
            >
          </div>
          <p v-if="paymentError" class="payment-error">{{ paymentError }}</p>
          <button
            class="checkout-submit"
            type="button"
            :disabled="paying"
            @click="handleCheckout"
          >
            {{ paying ? '正在创建订单…' : '确认并前往支付' }}
          </button>
        </template>
        <div v-else class="order-created">
          <div class="order-success">✓</div>
          <h3>订单创建成功</h3>
          <p>订单号：{{ order.orderNo }}</p>
          <p>应付金额：¥{{ (order.amountCents / 100).toFixed(2) }}</p>
          <p class="order-hint">
            演示环境不会发起真实扣款。生产环境可用 checkoutUrl 对接支付网关。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-card {
  position: relative;
  height: 100%;
}

.plan-card--highlight {
  border: 2px solid var(--site-brand);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--site-brand) 18%, transparent);
}

.plan-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 2px 10px;
  font-size: 0.75rem;
  color: #fff;
  background: var(--site-brand);
  border-radius: 999px;
}

.plan-name {
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.plan-price {
  margin-bottom: 8px;
}

.price-value {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--site-brand);
}

.price-unit {
  margin-left: 4px;
  font-size: 0.95rem;
  color: var(--site-text-4);
}

.plan-desc {
  min-height: 44px;
  margin: 0 0 20px;
  font-size: 0.92rem;
  color: var(--site-text-3);
}

.plan-cta {
  margin-bottom: 24px;
  border-radius: var(--site-radius-sm);
}

.plan-features {
  padding: 0;
  margin: 0;
  list-style: none;
}

.plan-features li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  font-size: 0.92rem;
  color: var(--site-text-2);
  border-top: 1px solid var(--site-border);
}

.plan-check {
  font-weight: 700;
  color: #52c41a;
}

.checkout-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(15 23 42 / 55%);
  backdrop-filter: blur(5px);
}

.checkout-panel {
  position: relative;
  width: min(480px, 100%);
  padding: 30px;
  color: var(--site-text-1);
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 18px;
  box-shadow: 0 24px 80px rgb(15 23 42 / 25%);
}

.checkout-close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 26px;
  color: var(--site-text-3);
  cursor: pointer;
  background: none;
  border: 0;
}

.checkout-summary {
  padding: 14px;
  color: var(--site-text-2);
  background: var(--site-bg-soft);
  border-radius: 10px;
}

.payment-channels {
  display: grid;
  gap: 10px;
  margin: 18px 0;
}

.payment-channels label {
  padding: 12px;
  cursor: pointer;
  border: 1px solid var(--site-border);
  border-radius: 10px;
}

.checkout-submit {
  width: 100%;
  padding: 12px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  background: var(--site-brand);
  border: 0;
  border-radius: 10px;
}

.checkout-submit:disabled {
  cursor: wait;
  opacity: 0.65;
}

.payment-error {
  color: #ef4444;
}

.order-created {
  text-align: center;
}

.order-success {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 12px;
  font-size: 28px;
  color: #fff;
  background: #22c55e;
  border-radius: 50%;
}

.order-hint {
  font-size: 13px;
  color: var(--site-text-3);
}
</style>
