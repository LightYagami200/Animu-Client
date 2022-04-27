<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
