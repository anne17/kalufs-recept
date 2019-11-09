import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Popover from "vue-js-popover";
import Vue2TouchEvents from "vue2-touch-events";
const Multiselect = () => import("vue-multiselect");


Vue.use(Popover);
Vue.use(Vue2TouchEvents);
Vue.component("multiselect", Multiselect);
Vue.use(Multiselect);


Vue.config.productionTip = false;
Vue.prototype.$backend =
  process.env.NODE_ENV === "production"
    ? "https://api.kalufs.lol/recapi/"
    : "http://0.0.0.0:9005/";

Vue.prototype.$defaultimg = Vue.prototype.$backend + "defaultimg";
Vue.prototype.$defaultthumb = Vue.prototype.$backend + "defaultthumb";
Vue.prototype.$imagePath = Vue.prototype.$backend + "img/";
Vue.prototype.$mediumImagePath = Vue.prototype.$backend + "img/medium/";
Vue.prototype.$thumbnailPath = Vue.prototype.$backend + "img/thumbnail/";
Vue.prototype.$tmpImagePath = Vue.prototype.$backend + "img/tmp/";

Vue.prototype.$defaulttitle = "kalufs-recept";

global.Vue = Vue;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
