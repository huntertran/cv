import VueRouter from 'vue-router'
import Vue from 'vue'

import Blog from './components/Blog'
import Award from './components/Award'
import Cv from './components/Cv'

Vue.use(VueRouter);

const routes = [
  {
    path: '/blog',
    component: Blog
  },
  {
    path:'/awards',
    component: Award
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