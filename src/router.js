import { createRouter, createWebHistory } from 'vue-router'

import Cv from './components/Cv.vue'
import Awards from './components/Awards.vue'
import Researches from './components/Researches.vue'
import Projects from './components/Projects.vue'
import Blog from './components/Blog.vue'

const routes = [
  { path: '/', component: Cv },
  { path: '/cv', component: Cv },
  { path: '/awards', component: Awards },
  { path: '/researches', component: Researches },
  { path: '/projects', component: Projects },
  { path: '/blog', component: Blog }
]

// Clean URLs. GitHub Pages deep links rely on the 404.html fallback (see vite.config.js).
export default createRouter({
  history: createWebHistory(),
  routes
})
