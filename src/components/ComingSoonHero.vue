<template>
  <div class="coming-soon-hero">
    <v-row class="text-center v-align">
      <v-col cols="12">
        <h2 class="text-uppercase">Future of NFTs</h2>
        <h1 class="text-uppercase">Coming Soon</h1></v-col
      >
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ComingSoonHero',
});
</script>

<style lang="scss" scoped>
.v-align {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-size: 64px;
  letter-spacing: 4rem;
  font-weight: 400;
}

h2 {
  font-size: 24px;
  letter-spacing: 2rem;
  font-weight: 400;
  color: #ffffffaa;
}
</style>
