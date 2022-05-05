<template>
  <div>
    <app-layout-dashboard>
      <manage-collection-sidebar />
      <slot />
    </app-layout-dashboard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayoutDashboard from '@/layouts/AppLayoutDashboard.vue';
import ManageCollectionSidebar from '@/components/collections/ManageCollectionSidebar.vue';

export default Vue.extend({
  components: {
    AppLayoutDashboard,
    ManageCollectionSidebar,
  },
});
</script>
