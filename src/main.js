import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Popover from "vue-js-popover"
import VueClipboard from "vue-clipboard2"
import Toasted from "vue-toasted"
import VScrollLock from "v-scroll-lock"

Vue.use(Popover)
Vue.use(VueClipboard)
Vue.use(Toasted, { position: "bottom-center", duration: 2000, keepOnHover: true, theme: "outline" })
Vue.use(VScrollLock)

Vue.config.productionTip = false
Vue.prototype.$backend =
  process.env.NODE_ENV === "production" ? "https://api.kalufs.lol/recapi/" : "http://localhost:9005/"

Vue.prototype$baseUrl = process.env.NODE_ENV === "production" ? "/recept/" : "/"

Vue.prototype.$defaultimg = "default.jpg"
Vue.prototype.$imagePath = Vue.prototype.$backend + "img/"
Vue.prototype.$mediumImagePath = Vue.prototype$baseUrl + "img_medium/"
Vue.prototype.$thumbnailPath = Vue.prototype$baseUrl + "img_thumb/"

Vue.prototype.$defaulttitle = "kalufs-recept"

global.Vue = Vue

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
