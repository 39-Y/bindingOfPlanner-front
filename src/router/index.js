
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ActionList from '@/views/ActionList.vue'

const routes = [
  {
    path:'/',
    component: ActionList,
  },
  {
    path:'/action/list',
    component: ActionList,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
