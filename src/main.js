import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Popover from "vue-js-popover";
import Vue2TouchEvents from "vue2-touch-events";
import moment from "moment";

Vue.use(Popover);
Vue.use(Vue2TouchEvents);

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;
Vue.prototype.$backend =
  process.env.NODE_ENV === "production"
    ? "https://api.kalufs.lol/recapi/"
    : "http://0.0.0.0:9005/";

Vue.prototype.$defaultimg = Vue.prototype.$backend + "defaultimg";

global.Vue = Vue;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
