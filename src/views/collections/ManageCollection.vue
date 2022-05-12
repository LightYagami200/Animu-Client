<template>
  <div class="manage-collection">
    <v-container fill-height v-if="collectionLoading">
      <v-row>
        <v-col cols="12">
          <h2>Manage</h2>
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
          <v-form v-model="collectionSettings.isValid">
            <v-row>
              <v-col cols="12">
                <h2>Manage</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h3>Basic Settings</h3>
                <p>Configure Basic settings for your collection</p>
                <hr class="grey darken-3" />
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6"
                    ><h4>Collection Name</h4>
                    <p>Name of your collection</p></v-col
                  >
                  <v-col cols="6">
                    <v-text-field
                      outlined
                      label="Collection Name"
                      v-model="collectionSettings.name"
                      data-form-type="other"
                      :rules="[
                        (v) => !!v || 'Name is required',
                        (v) =>
                          v.length <= 50 ||
                          'Name must be less than 50 characters',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Collection Tags</h4>
                    <p>Provide upto 5 tags for your collection</p></v-col
                  >
                  <v-col cols="6">
                    <v-combobox
                      outlined
                      label="Collection Tags"
                      v-model="collectionSettings.tags"
                      multiple
                      hint="Max 5 tags"
                      chips
                      :rules="[(v) => v.length <= 5 || 'Max 5 tags']"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Collection Description</h4>
                    <p>Describe your collection</p></v-col
                  >
                  <v-col cols="6">
                    <v-textarea
                      outlined
                      label="Collection Description"
                      v-model="collectionSettings.description"
                      data-form-type="other"
                      :rules="[
                        (v) => !!v || 'Description is required',
                        (v) =>
                          v.length >= 10 ||
                          'Description must be at least 10 characters',
                        (v) =>
                          v.length <= 500 ||
                          'Description must be less than 500 characters',
                      ]"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="mt-16">
              <v-col cols="12">
                <h3>Appearance</h3>
                <p>Configure how your collection appears to viewers</p>
                <hr class="grey darken-3" />
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6"
                    ><h4>Logo</h4>
                    <p>Logo for your Collection</p></v-col
                  >
                  <v-col cols="6" class="text-center">
                    <v-avatar size="80">
                      <v-img
                        :src="
                          collectionSettings.image ||
                          'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-236.png'
                        "
                        content-class="align-center justify-center"
                      >
                        <v-btn icon>
                          <v-icon color="black" size="40"
                            >mdi-pencil</v-icon
                          >
                        </v-btn>
                      </v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Banner</h4>
                    <p>Banner for your Collection</p></v-col
                  >
                  <v-col cols="6" class="text-center">
                    <v-img
                      aspect-ratio="1.77778"
                      cover
                      :src="
                        collectionSettings.banner ||
                        'https://images.unsplash.com/photo-1630710478039-9c680b99f800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
                      "
                      class="align-center rounded-lg"
                      content-class="align-center justify-center"
                    >
                      <v-btn icon>
                        <v-icon size="40">mdi-pencil</v-icon>
                      </v-btn>
                    </v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="mt-16">
              <v-col cols="12">
                <h3>Socials</h3>
                <p>Configure your social profiles</p>
                <hr class="grey darken-3" />
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6"
                    ><h4>Website</h4>
                    <p>Link to your website</p></v-col
                  >
                  <v-col cols="6">
                    <v-text-field
                      outlined
                      label="Website"
                      prepend-inner-icon="mdi-web"
                      v-model="collectionSettings.website"
                      data-form-type="other"
                      :rules="[
                        (v) =>
                          !v ||
                          !!v.match(
                            // eslint-disable-next-line max-len
                            /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/,
                          ) ||
                          'Provide a valid domain',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Twitter Username</h4>
                    <p>Your Twitter username</p></v-col
                  >
                  <v-col cols="6">
                    <v-text-field
                      outlined
                      label="Twitter Username"
                      prepend-inner-icon="mdi-twitter"
                      v-model="collectionSettings.twitter"
                      data-form-type="other"
                      :rules="[
                        (v) =>
                          !v ||
                          !!v.match(/^[A-Za-z0-9_]{1,15}$/) ||
                          'Provide a valid username',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Discord Invite Code</h4>
                    <p>Invite code from your discord invite link</p></v-col
                  >
                  <v-col cols="6">
                    <v-text-field
                      outlined
                      label="Discord Invite Code"
                      prepend-inner-icon="mdi-discord"
                      v-model="collectionSettings.discord"
                      data-form-type="other"
                      :rules="[
                        (v) =>
                          !v ||
                          !!v.match(/^[A-Za-z0-9_]{1,15}$/) ||
                          'Provide a valid invite code',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"
                    ><h4>Instagram Username</h4>
                    <p>Your Instagram username</p></v-col
                  >
                  <v-col cols="6">
                    <v-text-field
                      outlined
                      label="Instagram Username"
                      prepend-inner-icon="mdi-instagram"
                      v-model="collectionSettings.instagram"
                      data-form-type="other"
                      :rules="[
                        (v) =>
                          !v ||
                          !!v.match(/^[A-Za-z0-9_]{1,15}$/) ||
                          'Provide a valid username',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="text-right">
                <v-btn
                  color="primary"
                  class="mr-4 rounded"
                  @click="saveCollectionSettings"
                  :disabled="
                    !collectionSettings.isValid ||
                    collectionSettings.isLoading
                  "
                >
                  <v-icon left>mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
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

    this.collectionSettings = {
      ...this.collectionSettings,
      ...collection,
    };
    this.collectionLoading = false;
  },
  data() {
    return {
      collectionSettings: {
        isValid: false,
        isLoading: false,
        id: '',
        name: '',
        description: '',
        socials: {
          websiteURI: '',
          twitterUsername: '',
          discordInviteCode: '',
          instagramUsername: '',
        },
        logo: '',
        banner: '',
        tags: '',
      },
      collectionLoading: true,
    };
  },
  computed: {
    discordUser() {
      return this.$store.state.discordUser;
    },
  },
  methods: {
    async saveCollectionSettings() {
      try {
        await axios.put(
          `${host}/collections/${this.collectionSettings.id}`,
          this.collectionSettings,
          {
            headers: {
              'x-access-token': localStorage.getItem('ANIMU_USER_TOKEN')!,
            },
          },
        );

        this.$store.commit('displaySnackbar', 'Collection settings saved');
      } catch (e) {
        console.log({ e });
        this.$store.commit(
          'displaySnackbar',
          'Error saving collection settings - Please try again',
        );
      }
    },
  },
});
</script>
