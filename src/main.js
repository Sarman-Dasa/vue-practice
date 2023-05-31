import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import axios from 'axios'
import CryptoJS from 'crypto-js'

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.config.productionTip = false

// decrypt user info
if(localStorage.getItem('token') && localStorage.getItem('userInfo')) {
  let token = CryptoJS.AES.decrypt(localStorage.getItem('token'),process.env.VUE_APP_SECRET_KEY);
  token = token.toString(CryptoJS.enc.Utf8);

  store.commit('app/UPDATE_AUTH_TOKEN',token);

  let userInfo = CryptoJS.AES.decrypt(localStorage.getItem('userInfo'),process.env.VUE_APP_SECRET_KEY);
  userInfo = JSON.parse(userInfo.toString(CryptoJS.enc.Utf8));

  store.commit('app/UPDATE_AUTH_USER_DATA',userInfo);
}

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
