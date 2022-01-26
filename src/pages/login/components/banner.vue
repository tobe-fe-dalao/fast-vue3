<template>
    <div class="banner">
        <div class="banner-inner">
            <a-carousel class="carousel" animation-name="fade">
                <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
                    <div :key="item.slogan" class="carousel-item">
                        <div class="carousel-title">{{ item.slogan }}</div>
                        <div class="carousel-sub-title">{{ item.subSlogan }}</div>
                        <img class="carousel-image" :src="item.image" />
                    </div>
                </a-carousel-item>
            </a-carousel>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import bannerImage from '@/assets/images/login-banner.png';

export default defineComponent({
    setup() {
        const carouselItem = computed(() => [
            {
                slogan: '开箱即用的高质量模板',
                subSlogan: '丰富的的页面模板，覆盖大多数典型业务场景',
                image: bannerImage,
            }
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
        color: var(--color-fill-1);
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
