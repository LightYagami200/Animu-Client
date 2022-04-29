<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Vue from 'vue';

const defaultLayout = 'AppLayoutDefault';

export default Vue.extend({
  name: 'AppLayout',
  mounted() {
    this.$store.dispatch('connectWalletEager');
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
});
</script>
