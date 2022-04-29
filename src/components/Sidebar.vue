<template>
  <div class="sidebar">
    <!-- Desktop Nav -->
    <v-navigation-drawer
      dark
      permanent
      absolute
      class="hidden-md-and-down pc-nav-drawer"
    >
      <v-list dense nav>
        <v-list-item class="mb-8 text-center">
          <v-list-item-content>
            <v-list-item-title
              class="text-h5 font-weight-bold secondary-text"
              >ANIMU</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/login" v-if="!user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/dashboard" v-if="user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/collections">
          <v-list-item-icon>
            <v-icon>mdi-compass</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Explore</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/me" v-if="user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-image-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Collections</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Mobile Nav -->
    <v-navigation-drawer
      dark
      temporary
      absolute
      class="hidden-lg-and-up mobile-nav-drawer"
      v-model="showDrawer"
    >
      <v-list dense nav>
        <v-list-item link to="/login" v-if="!user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/dashboard" v-if="user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/collections">
          <v-list-item-icon>
            <v-icon>mdi-compass</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Explore</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/me" v-if="user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-image-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Collections</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardLayout',
  props: {
    drawer: Boolean,
  },
  watch: {
    drawer() {
      // @ts-ignore
      this.showDrawer = !this.showDrawer;
    },
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  computed: {
    discordUser() {
      // @ts-ignore
      return this.$store.state.discordUser;
    },
    user() {
      // @ts-ignore
      return this.$store.state.user;
    },
    wallet() {
      // @ts-ignore
      return this.$store.state.wallet;
    },
  },
  methods: {
    connectWallet() {
      this.$store.dispatch('connectWallet');
    },
    disconnectWallet() {
      this.$store.dispatch('disconnectWallet');
    },
  },
});
</script>
