<template>
  <div class="sidebar">
    <!-- Nav -->
    <v-navigation-drawer
      dark
      permanent
      fixed
      v-if="drawer"
      class="nav-drawer"
    >
      <v-list dense nav>
        <v-list-item class="mb-8 align-center" v-if="user.discordID">
          <v-list-item-avatar size="60">
            <v-img
              :src="`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=240`"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              ><h3>{{ discordUser.username }}</h3></v-list-item-title
            >
            <v-list-item-subtitle>
              <span v-if="user.publicKey">Verified</span>
              <span v-else>Unverified</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          :to="`/collections/${slug}`"
          v-if="content === 'manage-collection'"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-backburger</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Go Back</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/login" v-if="!user.discordID">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          :to="`/collections/${slug}/manage`"
          v-if="content === 'manage-collection'"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/dashboard"
          v-if="user.discordID && content === 'dashboard'"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/collections" v-if="content === 'dashboard'">
          <v-list-item-icon>
            <v-icon>mdi-compass</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Explore</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/me"
          v-if="user.discordID && content === 'dashboard'"
        >
          <v-list-item-icon>
            <v-icon>mdi-image-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Collections</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="logout">
          <v-list-item-icon>
            <v-icon class="red--text">mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',
  props: {
    drawer: Boolean,
    content: String,
  },
  mounted() {
    // @ts-ignore
    if (this.$vuetify.breakpoint.mdAndDown) {
      // @ts-ignore
      this.drawer = false;
    }
  },
  watch: {
    drawer() {
      // @ts-ignore
      this.showDrawer = !this.showDrawer;
    },
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  computed: {
    discordUser() {
      // @ts-ignore
      return this.$store.state.discordUser;
    },
    user() {
      // @ts-ignore
      return this.$store.state.user;
    },
    slug() {
      // @ts-ignore
      return this.$route.params.slug;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('ANIMU_USER_TOKEN');
      this.$router.replace({
        name: 'Home',
      });
    },
  },
});
</script>
