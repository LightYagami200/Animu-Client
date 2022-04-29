<template>
  <div class="dashboard">
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
        <NFTCard
          :image="nft.image"
          :name="nft.name"
          :staked="nft.staked"
          :symbol="nft.symbol"
        />
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
  </div>
</template>

<script lang="ts">
import NFTCard from '@/components/dashboard/NFTCard.vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NFTCard,
  },
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
    connectWallet() {
      this.$store.dispatch('connectWallet');
    },
    disconnectWallet() {
      this.$store.dispatch('disconnectWallet');
    },
  },
});
</script>

<style lang="scss" scoped>
.collection-chip {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
