<template>
  <div id="app-layout-page">
    <v-row>
      <v-col cols="12" xl="2">
        <sidebar :drawer="drawer" />
      </v-col>
      <v-col cols="12" xl="10">
        <v-container>
          <navbar @toggleDrawer="drawer = !drawer" />
          <slot />
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Vue from 'vue';

export default Vue.extend({
  components: { Sidebar, Navbar },
  name: 'AppLayoutPage',
  data() {
    return {
      drawer: false,
    };
  },
});
</script>
