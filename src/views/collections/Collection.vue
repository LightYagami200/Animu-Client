<template>
  <div class="collection">
    <v-container fill-height>
      {{ collection }}
    </v-container>
  </div>
</template>

<script lang="ts">
import { host } from '@/config';
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'Collection',
  async mounted() {
    const { data: collection } = await axios.get(
      `${host}/collections/${this.$route.params.id}`,
    );

    this.collection = collection;
    this.collectionLoading = false;
  },
  data() {
    return {
      collection: {},
      collectionLoading: true,
    };
  },
});
</script>
