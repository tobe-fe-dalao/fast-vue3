import { defineComponent } from 'vue';
import { NavBar, Tag } from 'vant';

export default defineComponent({
  name: 'Home',
  setup() {
    const navbarslots = {
      left: () => <div>123</div>
    };
    return () => <NavBar v-slots={navbarslots}></NavBar>;
  }
});
