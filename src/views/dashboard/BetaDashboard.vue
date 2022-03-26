<template>
  <div class="beta-dashboard fill-height">
    <v-container>
      <v-row class="mt-12 mb-8">
        <v-col cols="12" class="text-center">
          <v-avatar size="120">
            <v-img
              :src="`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`"
            ></v-img>
          </v-avatar>
          <h2 class="ma-4">{{ discordUser.username }}</h2>
          <div>
            <v-btn
              color="primary"
              @click="connectWallet"
              v-if="!wallet.publicKey"
              ><v-icon left>mdi-wallet</v-icon> Connect Wallet</v-btn
            >
            <v-btn color="red" @click="disconnectWallet" v-else
              ><v-icon left>mdi-wallet</v-icon> Disconnect Wallet</v-btn
            >

            <v-btn
              color="green"
              @click="verifyWallet"
              class="ml-4"
              v-if="wallet.publicKey && !user.publicKey"
              ><v-icon left>mdi-shield-check-outline</v-icon> Verify
              Wallet</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-row v-if="!wallet.publicKey">
        <v-col cols="12" class="text-center">
          <h3>Connect wallet to see your cool nfts here ≧◡≦</h3>
        </v-col>
      </v-row>
      <v-row v-else-if="nfts.length < 1">
        <v-col cols="12" class="text-center">
          <h3>Seems you don't have any NFTs in your wallet (◕︵◕)</h3>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="(nft, i) in nfts"
          :key="`wallet:nft:${i}`"
        >
          <v-card class="mx-auto rounded-xl" elevation="12">
            <v-img
              class="white--text align-end"
              gradient="to top, rgba(0,0,0, 0.5), rgba(0,0,0,0)"
              :src="nft.image"
            >
              <v-chip
                v-if="nft.staked"
                color="primary"
                class="collection-chip"
                >Staked</v-chip
              >
              <v-card-title
                ><strong class="pr-2">{{ nft.symbol }}</strong> -
                {{ nft.name }}
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col v-if="wallet.loading" cols="6" sm="4" md="3" lg="2">
          <v-card class="mx-auto rounded-xl" elevation="12">
            <v-skeleton-loader
              style="aspect-ratio: 1/1"
              type="card"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BetaDashboard',
  mounted() {
    this.$store.dispatch('connectWalletEager');
  },
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
    nfts() {
      return this.$store.state.wallet.nfts;
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
    verifyWallet() {
      this.$store.dispatch('verifyWallet');
    },
  },
});
</script>

<style lang="scss" scoped>
.beta-dashboard {
  background-color: #130f40 !important;
  background-image: linear-gradient(
    135deg,
    #130f40 0%,
    #000000 74%
  ) !important;
}

.collection-chip {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
