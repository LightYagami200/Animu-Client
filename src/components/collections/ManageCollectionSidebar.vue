<template>
  <div class="manage-collection-sidebar"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ManageCollectionSidebar',
  computed: {
    user() {
      // @ts-ignore
      return this.$store.state.user;
    },
  },
});
</script>
