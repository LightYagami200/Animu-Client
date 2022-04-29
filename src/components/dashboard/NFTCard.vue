<template>
  <v-card class="mx-auto rounded-xl nft-card" elevation="12">
    <v-img
      class="white--text align-end"
      gradient="to top, rgba(0,0,0, 0.5), rgba(0,0,0,0)"
      :src="image"
    >
      <v-chip v-if="staked" color="primary" class="collection-chip"
        >Staked</v-chip
      >
      <v-card-title
        ><strong class="pr-2">{{ symbol }}</strong> -
        {{ name }}
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    image: String,
    name: String,
    symbol: String,
    staked: Boolean,
  },
});
</script>
