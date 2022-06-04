<template>
  <v-app>
    <app-layout>
      <router-view></router-view>
    </app-layout>

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
import AppLayout from './layouts/AppLayout.vue';

export default Vue.extend({
  components: { AppLayout },
  name: 'App',
  computed: {
    snackbar: {
      get() {
        // @ts-ignore
        return this.$store.state.snackbar;
      },
      set(value) {
        // @ts-ignore
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
}

// Scrollbar
body::-webkit-scrollbar {
  width: 4px;
}

body::-webkit-scrollbar-track {
  background: none;
}

body::-webkit-scrollbar-thumb {
  background-color: #2196f3;
  border-radius: 8px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  opacity: 0.87;
}

html {
  overflow-y: auto !important;
}

p,
span {
  opacity: 0.6;
}

.v-btn span {
  opacity: 1 !important;
}

body,
.theme--dark.v-application {
  background: #000000 !important;
}

.v-toolbar__content {
  width: 100% !important;
}

.v-btn__content {
  overflow: visible !important;
}

div[role='combobox'] {
  .v-input__icon {
    display: none !important;
  }
}

.home,
.beta-testers-only {
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

.v-align {
  margin-top: 50vh !important;
  transform: translateY(-50%) !important;
}

// Overwrite default components
.v-navigation-drawer {
  background: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.nav-drawer {
  padding: 16px;
}

.v-navigation-drawer__border {
  display: none;
}

.filepond--wrapper {
  background: #00000077 !important;
  border-radius: 8px;
}

.filepond--panel-root {
  background-color: transparent !important;
}

// Custom styles
.glass-list {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.glass {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.logout {
  position: absolute !important;
  bottom: 16px !important;
}
</style>
