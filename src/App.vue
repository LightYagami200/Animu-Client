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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  overflow: hidden !important;
}

.theme--dark.v-application {
  background-color: var(--v-background-base, #000) !important;
}

.home {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    no-repeat center center / cover url('/img/bg1.jpg');
}
</style>
