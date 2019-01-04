import Vue from "vue";
import Router from "vue-router";
import Recipies from "./views/Recipies.vue";
import EditRecipe from "./views/EditRecipe.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "recipies",
      component: Recipies
    },
    {
      path: "/edit",
      name: "edit",
      component: EditRecipe
    }
  ]
});
