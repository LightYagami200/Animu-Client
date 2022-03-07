<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="text-uppercase">Future of NFTs</h2>
          <h1 class="text-uppercase">Coming Soon</h1></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

h1 {
  font-size: 32px;
  letter-spacing: 2.5rem;
  font-weight: 400;
}

h2 {
  font-size: 18px;
  letter-spacing: 1rem;
  font-weight: 400;
  color: #ffffffaa;
}

// RESPONSIVENESS
@media #{map-get($display-breakpoints, 'lg-and-up')} {
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
}
</style>
