<template>
  <div class="dashboard">
    <v-navigation-drawer dark permanent absolute>
      <v-list dense nav>
        <v-list-item class="mb-8 text-center">
          <v-list-item-content>
            <v-list-item-title
              class="text-h5 font-weight-bold secondary-text"
              >ANIMU</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/dashboard/collection')" link>
          <v-list-item-icon>
            <v-icon>mdi-collage</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Collection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <v-app-bar color="transparent" elevation="0">
        <h3>Good Evening, {{ discordUser.username }}</h3>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="connectWallet"
          v-if="!wallet.publicKey"
          ><v-icon left>mdi-wallet</v-icon> Connect Wallet</v-btn
        >
        <v-btn color="red" @click="disconnectWallet" v-else
          ><v-icon left>mdi-wallet</v-icon> Disconnect Wallet</v-btn
        >
      </v-app-bar>

      <router-view></router-view>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardLayout',
  mounted() {
    this.$store.dispatch('connectWalletEager');
  },
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
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
    connectWallet() {
      this.$store.dispatch('connectWallet');
    },
    disconnectWallet() {
      this.$store.dispatch('disconnectWallet');
    },
  },
});
</script>

<style scoped>
.logout-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  width: calc(100% - 16px);
  transform: translateX(-50%);
}
</style>
