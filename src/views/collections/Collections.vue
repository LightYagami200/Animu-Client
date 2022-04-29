<template>
  <div class="collections">
    <v-row>
      <v-col cols="12">
        <h2 v-if="!loadLoggedInUserCollections">Explore</h2>
        <h2 v-else>My Collections</h2>
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
        <collection-card
          :name="collection.name"
          :banner="collection.banner"
          :slug="collection.slug"
        />
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
      <v-col cols="12" md="6" lg="4" v-if="loadLoggedInUserCollections">
        <v-card
          class="glass rounded-xl"
          @click="openCreateCollectionModal"
          style="height: 100%"
        >
          <v-card-text
            class="d-flex justify-center align-center"
            style="height: 100%"
          >
            <v-icon>mdi-plus</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!collectionsLoading && !collections.length">
      <v-col cols="12" class="text-center">
        <h3>Couldn't find any collections (◕︵◕)</h3>
      </v-col>
    </v-row>

    <!-- Create new collection -->
    <v-row justify="center">
      <v-dialog v-model="createCollection.dialog" max-width="500px">
        <v-card class="glass">
          <v-card-title>Create Collection</v-card-title>
          <v-card-text>
            <v-form v-model="createCollection.isValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="createCollection.name"
                    label="Collection Name"
                    autocomplete="off"
                    data-form-type="other"
                    hide-details="auto"
                    :rules="[
                      (v) => !!v || 'Name is required',
                      (v) =>
                        v.length <= 50 ||
                        'Name must be less than 50 characters',
                    ]"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="createCollection.description"
                    label="Collection Description"
                    hide-details="auto"
                    :rules="[
                      (v) => !!v || 'Description is required',
                      (v) =>
                        v.length >= 10 ||
                        'Description must be at least 10 characters',
                      (v) =>
                        v.length <= 500 ||
                        'Description must be less than 500 characters',
                    ]"
                    required
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeCreateCollectionModal">Cancel</v-btn>
            <v-btn
              color="blue"
              :disabled="
                !createCollection.isValid || createCollection.isLoading
              "
              :loading="createCollection.isLoading"
              @click="confirmCreateCollection"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import CollectionCard from '@/components/collections/CollectionCard.vue';
import { host } from '@/config';
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  components: { CollectionCard },
  name: 'Collections',
  async mounted() {
    if (this.loadLoggedInUserCollections) {
      const { data: collections } = await axios.get(
        `${host}/collections/me`,
        {
          headers: {
            'x-access-token': localStorage.getItem('ANIMU_USER_TOKEN')!,
          },
        },
      );

      this.collections = collections;
      this.collectionsLoading = false;
    } else {
      const { data: collections } = await axios.get(
        `${host}/collections?page=1&limit=20`,
      );

      this.collections = collections;
      this.collectionsLoading = false;
    }
  },
  data() {
    return {
      collections: [],
      collectionsLoading: true,
      createCollection: {
        dialog: false,
        isValid: false,
        isLoading: false,
        name: '',
        description: '',
      },
    };
  },
  computed: {
    loadLoggedInUserCollections() {
      return this.$route.meta!.loadLoggedInUserCollections;
    },
  },
  methods: {
    openCreateCollectionModal() {
      this.createCollection.dialog = true;
    },
    closeCreateCollectionModal() {
      this.createCollection.dialog = false;
    },
    async confirmCreateCollection() {
      this.createCollection.isLoading = true;

      try {
        await axios.post(
          `${host}/collections`,
          {
            name: this.createCollection.name,
            description: this.createCollection.description,
          },
          {
            headers: {
              'x-access-token': localStorage.getItem('ANIMU_USER_TOKEN')!,
            },
          },
        );

        this.createCollection.dialog = false;
        this.createCollection.name = '';
        this.createCollection.description = '';
      } catch (e) {
        console.error(e);

        this.$store.commit(
          'displaySnackbar',
          'Failed to create collection, please try again later.',
        );
      }

      this.createCollection.isLoading = false;
    },
  },
});
</script>
