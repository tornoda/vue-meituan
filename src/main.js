import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from "./store";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = true

Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
