<template>
  <div class="manage-collection">
    <v-container fill-height>
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
                data-form-type="other"
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
                multiple
                hint="Max 5 tags"
                chips
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
                data-form-type="other"
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
                    collection.image ||
                    'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-236.png'
                  "
                  content-class="align-center justify-center"
                >
                  <v-btn icon>
                    <v-icon color="black" size="40">mdi-pencil</v-icon>
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
                  collection.banner ||
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
                data-form-type="other"
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
                data-form-type="other"
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
                data-form-type="other"
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
                data-form-type="other"
              ></v-text-field>
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
