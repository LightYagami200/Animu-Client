import axios from 'axios';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { host } from '@/config';
import store from '@/store';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('../views/TermsOfService.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresUserAuth: true,
      layout: 'AppLayoutDashboard',
    },
  },
  {
    path: '/collections',
    component: () => import('../components/Passthrough.vue'),
    children: [
      {
        path: '',
        name: 'Collections',
        component: () => import('../views/collections/Collections.vue'),
        meta: {
          optionalUserAuth: true,
          layout: 'AppLayoutDashboard',
        },
      },
      {
        path: ':slug',
        name: 'Collection',
        component: () => import('../views/collections/Collection.vue'),
        meta: {
          optionalUserAuth: true,
          layout: 'AppLayoutCollection',
        },
      },
    ],
  },
  {
    path: '/me',
    component: () => import('../views/collections/Collections.vue'),
    meta: {
      requiresUserAuth: true,
      layout: 'AppLayoutDashboard',
      loadLoggedInUserCollections: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.meta?.requiresUserAuth) {
    const token = localStorage.getItem('ANIMU_USER_TOKEN');
    if (!token) return next('/login');

    try {
      const { data } = await axios.post(
        `${host}/users/auth`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        },
      );

      store.commit('setDiscordUser', data.user.discord);
      store.commit('setUser', data.user.user);

      return next();
    } catch (e) {
      console.log(e);
      localStorage.removeItem('ANIMU_USER_TOKEN');

      return next('/login');
    }
  } else if (to.meta?.optionalUserAuth) {
    const token = localStorage.getItem('ANIMU_USER_TOKEN');
    if (!token) return next();

    try {
      const { data } = await axios.post(
        `${host}/users/auth`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        },
      );

      store.commit('setDiscordUser', data.user.discord);
      store.commit('setUser', data.user.user);

      return next();
    } catch (e) {
      console.log(e);
      localStorage.removeItem('ANIMU_USER_TOKEN');

      return next('/login');
    }
  }

  if (to.name === 'Login' && localStorage.getItem('ANIMU_USER_TOKEN'))
    return next('/dashboard');

  return next();
});

export default router;
