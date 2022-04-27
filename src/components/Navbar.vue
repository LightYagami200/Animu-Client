<template>
  <div class="navbar">
    <v-app-bar color="transparent" elevation="0" v-if="user">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="$emit('toggleDrawer')"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-avatar class="mx-4">
          <v-img
            :src="`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=160`"
          ></v-img>
        </v-avatar>
        <div class="d-flex flex-column">
          <v-menu left bottom offset-y rounded="lg">
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                {{ discordUser.username }}
                <v-icon color="primary">mdi-chevron-down</v-icon>
              </h5>
            </template>

            <v-list class="glass-list" dense>
              <v-list-item
                v-if="wallet.publicKey && !user.publicKey"
                @click="verifyWallet"
                link
              >
                <v-list-item-icon
                  ><v-icon>mdi-wallet</v-icon></v-list-item-icon
                >
                <v-list-item-title>Verify Wallet</v-list-item-title>
              </v-list-item>

              <v-list-item @click="logout" link>
                <v-list-item-icon
                  ><v-icon class="red--text"
                    >mdi-power</v-icon
                  ></v-list-item-icon
                >
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
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
