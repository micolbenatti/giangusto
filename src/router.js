import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Menu from './views/Menu.vue';
import Contatti from './views/Contatti.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/menu', component: Menu },
  { path: '/contatti', component: Contatti },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
