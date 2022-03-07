<template>
  <div class="home">
    <ComingSoonHero />
  </div>
</template>

<script lang="ts">
import ComingSoonHero from '@/components/ComingSoonHero.vue';
import Vue from 'vue';

export default Vue.extend({
  components: { ComingSoonHero },
  name: 'Home',
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.home {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    no-repeat center center / cover url('/img/bg1.jpg');
}
</style>
