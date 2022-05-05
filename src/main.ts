import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import AppLayout from './layouts/AppLayout.vue';

Vue.component('AppLayout', AppLayout);

Vue.config.productionTip = false;

Vue.use(VueClipboard);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
