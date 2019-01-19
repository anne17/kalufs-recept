import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Popover from "vue-js-popover";

Vue.use(Popover);

Vue.config.productionTip = false;
Vue.prototype.$backend =
  process.env.NODE_ENV === "production"
    ? "https://api.kalufs.lol/recapi/"
    : "http://0.0.0.0:9005/";

Vue.prototype.$defaultimg = Vue.prototype.$backend + "img/default.png";

global.Vue = Vue;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
