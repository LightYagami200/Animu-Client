<template>
  <div class="manage-collection">
    <v-container fill-height> Bruh </v-container>
  </div>
</template>

<script lang="ts">
import { host } from '@/config';
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'Collection',
  async mounted() {
    const token = localStorage.getItem('ANIMU_USER_TOKEN');

    if (!token)
      return this.$router.push(`/collections/${this.$route.params.slug}`);

    const { data: collection } = await axios.get(
      `${host}/collections/${this.$route.params.slug}`,
      {
        headers: {
          'x-access-token': token,
        },
      },
    );

    this.collection = collection;
    this.collectionLoading = false;
  },
  data() {
    return {
      collection: {} as {
        name: string;
        image: string;
        banner: string;
        owner: string;
      },
      collectionLoading: true,
    };
  },
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
    },
  },
});
</script>
