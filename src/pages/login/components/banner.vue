<template>
  <div class="banner">
    <div class="banner-inner">
      <!-- <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <div class="carousel-title">{{ item.slogan }}</div>
            <div class="carousel-sub-title">{{ item.subSlogan }}</div>
            <img class="carousel-image" :src="item.image" />
          </div>
        </a-carousel-item>
      </a-carousel> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import bannerImage from '/@/assets/images/login-banner.png';
  import qunErweima from '/@/assets/images/qunerweima.jpg';
  import bannerImage02 from '/@/assets/images/banner2.svg';

  export default defineComponent({
    setup() {
      const carouselItem = computed(() => [
        {
          slogan: 'Vue3+Vite2.X+TypeScript+...',
          subSlogan: '2022年最新Vue技术栈，最强配置',
          image: bannerImage,
        },
        {
          slogan: '开箱即用，多种插件，动态加载',
          subSlogan: '可支持大型中后台应用或轻量级无线端应用',
          image: bannerImage02,
        },
        {
          slogan: '社区维护，来芜湖四海大厂核心大牛',
          subSlogan: '扫码进入社区微信群',
          image: qunErweima,
        },
      ]);
      return {
        carouselItem,
      };
    },
  });
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .carousel {
    height: 100%;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-text-2);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

    &-sub-title {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 14px;
      line-height: 22px;
    }

    &-image {
      width: 320px;
      margin-top: 30px;
    }
  }
</style>
