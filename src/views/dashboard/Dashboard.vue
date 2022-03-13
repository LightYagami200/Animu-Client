<template>
  <div class="dashboard"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dashboard',
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
    },
  },
});
</script>
