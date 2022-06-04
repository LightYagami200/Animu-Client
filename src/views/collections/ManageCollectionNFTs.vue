<template>
  <div class="manage-collection">
    <v-container fill-height v-if="collectionLoading">
      <v-row>
        <v-col cols="12">
          <h2>Manage NFTs</h2>
        </v-col>
      </v-row>
      <v-row class="v-align">
        <v-col cols="12" sm="12" align="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-container fill-height v-else>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <h2>Manage NFTs</h2>
              <v-btn class="primary" @click="upload.dialog = true"
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <v-row class="mt-16">
            <v-col class="text-center">
              <v-img
                src="@/assets/not-found.svg"
                height="200"
                contain
              ></v-img>
              <h3 class="mt-8">It's empty here</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Upload NFTs -->
    <v-row justify="center">
      <v-dialog v-model="upload.dialog" max-width="500px">
        <v-card class="glass">
          <v-card-title>Upload NFTs</v-card-title>
          <v-card-text>
            <file-pond
              style="background: #000"
              label-idle="Drop ZIP file here..."
              v-bind:allow-multiple="false"
              accepted-file-types="application/x-zip-compressed, application/zip"
              :server="`${host}/api/v1/collections/${collection.id}/nfts/upload`"
              v-bind:files="upload.file"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { host } from '@/config';
import axios from 'axios';
import Vue from 'vue';
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default Vue.extend({
  name: 'ManageCollectionNFts',
  components: {
    FilePond,
  },
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
      collection: null,
      collectionLoading: true,
      upload: {
        dialog: false,
        file: null,
      },
    };
  },
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
    },
  },
});
</script>
