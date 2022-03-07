<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss" scoped>
.theme--dark.v-application {
  background-color: var(--v-background-base, #000) !important;
}
</style>
