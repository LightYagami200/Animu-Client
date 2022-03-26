<template>
  <div class="collection">
    <v-row class="mt-12">
      <v-col cols="12">
        <h2>Stuff in Wallet</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(nft, i) in nfts"
        :key="`wallet:nft:${i}`"
      >
        <v-card class="mx-auto rounded-xl" elevation="12">
          <v-img :src="nft.image" class="white--text align-end">
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
