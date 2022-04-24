<template>
  <div class="my-collections">
    <v-container fill-height>
      <v-row>
        <v-col cols="12">
          <h2>Collections</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="collection of collections"
          :key="collection._id"
        >
          <v-card class="mx-auto rounded-xl" elevation="12">
            <v-img
              class="white--text align-end"
              gradient="to top, rgba(0,0,0, 0.5), rgba(0,0,0,0)"
              :src="
                collection.banner ||
                'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-236.png'
              "
            >
              <v-card-title>
                {{ collection.name }}
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col v-if="collectionsLoading" cols="12" md="6" lg="4">
          <v-card
            class="mx-auto rounded-xl"
            elevation="12"
            style="height: 100%"
          >
            <v-skeleton-loader
              style="height: 100%"
              type="card"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="!collectionsLoading && !collections.length">
        <v-col cols="12" class="text-center">
          <h3>Couldn't find any collections (◕︵◕)</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { host } from '@/config';
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'Collections',
  async mounted() {
    const { data: collections } = await axios.get(
      `${host}/collections?page=1&limit=20`,
    );

    this.collections = collections;
    this.collectionsLoading = false;
  },
  data() {
    return {
      collections: [],
      collectionsLoading: true,
    };
  },
});
</script>
