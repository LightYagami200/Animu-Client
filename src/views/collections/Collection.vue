<template>
  <div class="collection">
    <v-container fill-height>
      <v-row v-if="!collection">
        <v-col>Collection not found</v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="banner-col">
          <v-card class="banner">
            <v-img
              class="banner-img align-end"
              cover
              :src="
                collection.banner ||
                'https://images.unsplash.com/photo-1630710478039-9c680b99f800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
              "
            >
              <div class="collection-btns">
                <v-btn icon class="mr-2"><v-icon>mdi-cog</v-icon></v-btn>
                <v-btn icon @click="shareCollection"
                  ><v-icon>mdi-share</v-icon></v-btn
                >
              </div>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-avatar size="100" class="avatar">
                    <v-img
                      :src="
                        collection.image ||
                        'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-236.png'
                      "
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" class="text-center">
          <h2>{{ collection.name }}</h2>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="text-center">
              <h3>This collection isn't currently live (◕ω◕✿)</h3>
            </v-col>
          </v-row>
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
  name: 'Collection',
  async mounted() {
    const token = localStorage.getItem('ANIMU_USER_TOKEN');

    const { data: collection } = await axios.get(
      `${host}/collections/${this.$route.params.slug}`,
      {
        headers: token
          ? {
              'x-access-token': token,
            }
          : {},
      },
    );

    this.collection = collection;
    this.collectionLoading = false;
  },
  data() {
    return {
      collection: {} as {
        name: string;
      },
      collectionLoading: true,
    };
  },
  methods: {
    async shareCollection() {
      if ('share' in navigator) {
        await navigator.share({
          title: this.collection.name,
          url: window.location.href,
        });
      } else {
        await this.$copyText(window.location.href);
        this.$store.commit('displaySnackbar', 'Copied to clipboard');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.banner-col {
  margin-bottom: 40px;
}

.banner,
.banner-img {
  max-height: 400px !important;
  overflow: visible;
}

.avatar {
  transform: translateY(50%);
}

.collection-btns {
  position: absolute;
  right: 32px;
  bottom: 32px;
}
</style>
