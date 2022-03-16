<template>
  <v-app>
    <router-view></router-view>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.$store.commit('displaySnackbar', {
          message: '',
          display: value,
        });
      },
    },
    snackbarMessage() {
      return this.$store.state.snackbarMessage;
    },
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  overflow: hidden !important;
}

.theme--dark.v-application {
  background-color: #130f40 !important;
  background-image: linear-gradient(
    135deg,
    #130f40 0%,
    #000000 74%
  ) !important;
}

.home {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    no-repeat center center / cover url('/img/bg.jpg');
}

// Custom Classes
.blue-gradient.gradient-text {
  background: -webkit-linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Overwrite default vuetify components
.v-navigation-drawer {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 32px;
  height: calc(100vh - 64px) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.v-navigation-drawer__border {
  display: none;
}

.glass-list {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
