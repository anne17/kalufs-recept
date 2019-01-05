import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.$backend =
  // "http://demo.spraakdata.gu.se/anne/recept/receptsida-backend/";
  // "https://api.kalufs.lol/recapi/";
  "http://0.0.0.0:9005/";

global.Vue = Vue;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
