import Vue from 'vue'
import App from './App.vue'
// import Axios from 'axios';
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/cv/" : "/",

// Vue.prototype.$http = Axios;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
