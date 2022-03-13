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
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Dashboard.vue'),
        meta: {
          requiresUserAuth: true,
        },
      },
    ],
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
    console.log({ token });
    if (!token) return next('/login');

    console.log('checking token');

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

      console.log({ data });
      store.commit('setDiscordUser', data.user.discord);

      console.log('token is valid');
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
