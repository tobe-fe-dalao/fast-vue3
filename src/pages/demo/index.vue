<script setup lang="ts">
  import { reactive } from 'vue';
  import Header from '/@/components/Header/index.vue';
  const title = `通过TailWind快速实现<br>Github2021年年度
                    <a traget="_blank" href="https://octoverse.github.com/"><font>octoverse</font></a>`;
  const datav = reactive([
    { num: 73, unit: '百万+', text: 'GitHub 上的开发人员总数', bg: 'bg-1' },
    { num: 16, unit: '百万+', text: '2021年新增用户', bg: 'bg-2' },
    {
      num: 84,
      unit: '百分之',
      text: '财富100强公司<br>使用GitHub Enterprise',
      bg: 'bg-0',
    },
    { num: 61, unit: '百万+', text: '创建的新存储库数量', bg: 'bg-0' },
    { num: 170, unit: '百万', text: '合并拉去请求', bg: 'bg-3' },
  ]);
</script>
<template>
  <Header />
  <section class="container max-w-screen-xl px-6 mx-auto 2xl:px-0">
    <div class="flex flex-wrap">
      <div class="flex w-1/2 p-20 bg-white">
        <h2 class="font-sans text-4xl" v-html="title"></h2>
      </div>
      <div v-for="(item, index) in datav" :key="index" class="flex w-1/2 p-20 bg-octo-violet-primary-light" :class="item.bg">
        <span class="inline-flex">
          <span class="font-blimone text-9xl stacked-fractions">{{ item.num }}</span>
          <span class="inline-flex flex-col">
            <span class="p-4 ml-2 text-4xl font-blimone">{{ item.unit }}</span>
            <span class="ml-6 font-thin text-1xl" v-html="item.text"></span>
          </span>
        </span>
      </div>
    </div>
  </section>
</template>
<style lang="less">
  .bg-0 {
    background-color: #fff;
  }

  .bg-1 {
    background-color: #f9f8ff;
  }

  .bg-2 {
    background-color: rgba(244, 248, 253, 1);
  }

  .bg-3 {
    background-color: rgba(240, 248, 246, 1);
  }

  font {
    color: #ff6900;
  }
</style>
