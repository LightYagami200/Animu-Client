<template>
  <v-card
    class="mx-auto rounded-xl collection-card"
    elevation="12"
    @click="$router.push(`/collections/${slug}`)"
  >
    <v-img
      class="white--text align-end"
      gradient="to top, rgba(0,0,0, 0.5), rgba(0,0,0,0)"
      :src="
        banner ||
        'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-236.png'
      "
    >
      <v-card-title>
        {{ name }}
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    banner: String,
    name: String,
    slug: String,
  },
});
</script>
