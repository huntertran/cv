import VueRouter from 'vue-router'
import Vue from 'vue'

import Blog from './components/Blog'
import Cv from './components/Cv'

Vue.use(VueRouter);

const routes = [
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/cv',
    component: Cv
  }
]

const router = new VueRouter({
  routes
});

export default router;