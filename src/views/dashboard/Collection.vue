<template>
  <div class="collection">
    <v-row class="mt-12">
      <v-col cols="12">
        <h2>Stuff in Wallet</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
        lg="3"
        v-for="(nft, i) in nfts"
        :key="`wallet:nft:${i}`"
      >
        <v-card class="mx-auto">
          <v-img class="white--text align-end" :src="nft.image">
            <v-card-title
              ><strong class="pr-2">{{ nft.symbol }}</strong> -
              {{ nft.name }}
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dashboard',
  computed: {
    wallet() {
      return this.$store.state.wallet;
    },
    nfts() {
      return this.$store.state.wallet.nfts;
    },
  },
});
</script>
