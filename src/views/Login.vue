<template>
  <div class="login">
    <v-container fill-height>
      <v-row class="v-align">
        <v-col cols="12" sm="12" align="center" v-if="loading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="blue"
            indeterminate
          ></v-progress-circular>
          <br />
          <br />
          <h2>Please wait...</h2>
        </v-col>
        <v-col cols="12" sm="12" align="center" v-if="!loading && error">
          <h2>{{ error }}</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { host, discordRedirectURI } from '../config';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      loading: true,
      error: '',
    };
  },
  async mounted() {
    const { code } = this.$route.query;

    if (!code) return (window.location.href = discordRedirectURI);

    try {
      console.log({ host });

      const res = await axios.post(`${host}/users/login`, {
        code,
      });

      console.log({ res });

      if (!res.data.token) {
        this.error = 'An unexpected error occured, please try again';
        this.loading = false;
        return;
      }

      localStorage.setItem('ANIMU_USER_TOKEN', res.data.token);
      this.$router.replace('/dashboard');
    } catch (e) {
      this.error = "It seems our server's are having some issues...";
      this.loading = false;
    }
  },
});
</script>
