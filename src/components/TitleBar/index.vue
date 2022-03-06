<template>
  <div class="main-page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  <nut-tabbar unactive-color="#364636" active-color="#1989fa" @tab-switch="tabSwitch">
    <nut-tabbar-item :tab-title="$t('tabbar.home')" font-class-name="iconfont" class-prefix="icon" icon="home"></nut-tabbar-item>
    <nut-tabbar-item :tab-title="$t('tabbar.list')" font-class-name="iconfont" class-prefix="icon" icon="list"></nut-tabbar-item>
    <nut-tabbar-item :tab-title="$t('tabbar.member')" font-class-name="iconfont" class-prefix="icon" icon="member"></nut-tabbar-item>
  </nut-tabbar>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Tabbar',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const getUserInfo = computed(() => {
      const { name = '' } = userStore.getUserInfo || {};
      return name;
    });

    function tabSwitch(item, index) {
      console.log(item, index);
      switch (index) {
        case 0:
          router.push('/home');
          break;
        case 1:
          router.push('/list');
          break;
        case 2:
          router.push('/member');
          break;
      }
    }

    return {
      getUserInfo,
      tabSwitch
    };
  }
});
</script>

<style scoped lang="scss">
.main-page {
  height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border: none;
  box-shadow: 0 0 20px -5px #9a9a9a;
}
</style>
