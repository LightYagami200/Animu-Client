<template>
  <div class="navbar">
    <v-app-bar class="app-bar" color="transparent" elevation="0">
      <div class="app-bar-item">
        <v-app-bar-nav-icon
          class="hidden-md-and-up hamburger-btn"
          @click="$emit('toggleDrawer')"
        ></v-app-bar-nav-icon>
      </div>

      <div class="app-bar-item">
        <div class="hidden-md-and-up">
          <v-list-item-title
            class="text-h5 font-weight-bold secondary-text"
            >ANIMU</v-list-item-title
          >
        </div>
      </div>

      <div class="app-bar-item"></div>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
    },
    user() {
      return this.$store.state.user;
    },
    wallet() {
      return this.$store.state.wallet;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('ANIMU_USER_TOKEN');
      this.$router.replace({
        name: 'Home',
      });
    },
    verifyWallet() {
      this.$store.dispatch('verifyWallet');
    },
  },
});
</script>

<style lang="scss" scoped>
.hamburger-btn {
  margin-right: auto;
}

.login-btn {
  margin-left: auto;
}

.app-bar {
  display: flex;

  .app-bar-item {
    display: flex;
    flex: 1 !important;
    justify-content: center;
  }
}
</style>
