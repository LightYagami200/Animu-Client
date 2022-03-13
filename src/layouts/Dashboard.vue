<template>
  <div class="dashboard">
    <v-navigation-drawer dark permanent absolute>
      <v-list dense nav>
        <v-list-item class="mb-8 text-center">
          <v-list-item-content>
            <v-list-item-title
              class="text-h5 font-weight-bold blue-gradient gradient-text"
              >ANIMU</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="logout-btn" @click="logout" link>
          <v-list-item-icon>
            <v-icon color="red">mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="red--text">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardLayout',
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

<style scoped>
.logout-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  width: calc(100% - 16px);
  transform: translateX(-50%);
}
</style>
