<script setup lang="ts">
import { reactive, ref } from "vue"
const num = ref(0)
const hrTitle = `让我们回顾一下
                    <br />今年<font>UU智能招聘</font>的数据...`;
const okrTitle = `UUToB商业化探索的第一年
                    <br />高人效作品<font>UUOKR</font>的发起...`;
const datav = reactive([
    { num: 3121, unit: '人', text: '参与邀约流程的<br>候选人总数', bg: 'bg-1' },
    { num: '40 +', unit: '%', text: '提升HR部门招聘人效', bg: 'bg-2' },
    { num: '3', unit: '大优势', text: '招聘流程自动化、全渠道聚合管理、简历智能解析', bg: 'bg-0' },
    { num: '3.0', unit: '版本', text: '完全自主产权<br>纯自研系统、全新UI升级', bg: 'bg-0' },
    { num: '∞ ', unit: '未来', text: '可支持商业化、公有云<br>私有云、混合云部署方案', bg: 'bg-3' }
]);
const dataOkr = reactive([
    { num: 569, unit: '人', text: '参与OKR的拆解<br>全员占比<font>58.6%</font>', bg: 'bg-3' },
    { num: '100', unit: '%', text: '目标协作从0到1的过程', bg: 'bg-1' },
    { num: '5', unit: '大特色', text: '简洁高效、全员公开、AI对齐关系树<br>智能辅助、数据分析', bg: 'bg-0' },
    { num: '2.0', unit: '版本', text: '完全自主产权、纯自研系统<br>已上架钉钉市场', bg: 'bg-0' },
    { num: '∞', unit: '规划', text: '落地难、变现弱<br>尝试私有化部署路线', bg: 'bg-3' }
]);
const dataVs = reactive([
    { num: '63-93%', unit: '提升', text: '2021年1-8月份接通率均值', bg: 'bg-1' },
])
</script>
<template>
    <section class="container mx-auto max-w-screen-xl px-6 2xl:px-0">
        <div class="flex flex-wrap">
            <div class="flex w-1/2 p-20">
                <h2 class="font-sans text-4xl" v-html="okrTitle"></h2>
            </div>
            <div
                class="flex w-1/2 p-20 bg-octo-violet-primary-light"
                v-for="(item,index) in datav"
                :key="index"
                :class="item.bg"
            >
                <span class="inline-flex">
                    <span class="font-blimone text-9xl stacked-fractions">{{ item.num }}</span>
                    <span class="inline-flex flex-col">
                        <span class="text-6xl ml-6 font-blimone">{{ item.unit }}</span>
                        <span class="text-2xl ml-6 font-thin" v-html="item.text"></span>
                    </span>
                </span>
            </div>
        </div>
        <!-- 样式二 -->
        <div class="flex mt-20">
            <div
                class="flex p-20 bg-octo-violet-primary-light"
                v-for="(item,index) in dataVs"
                :key="index"
                :class="item.bg"
            >
                <span class="font-blimone text-9xl stacked-fractions">{{ item.num }}</span>
                <span class="inline-flex flex-col">
                    <span class="text-6xl ml-6 font-blimone">{{ item.unit }}</span>
                    <span class="text-2xl ml-6 font-thin" v-html="item.text"></span>
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