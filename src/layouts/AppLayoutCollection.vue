<template>
  <div>
    <app-layout-dashboard>
      <slot />
    </app-layout-dashboard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayoutDashboard from '@/layouts/AppLayoutDashboard.vue';

export default Vue.extend({
  components: {
    AppLayoutDashboard,
  },
});
</script>
