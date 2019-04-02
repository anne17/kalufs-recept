import Vue from "vue";
import Router from "vue-router";
import Recipes from "./views/Recipes.vue";
import EditRecipe from "./views/EditRecipe.vue";
import ViewRecipe from "./views/ViewRecipe.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "recipes",
      component: Recipes
    },
    {
      path: "/edit/:title",
      name: "edit",
      component: EditRecipe
    },
    {
      path: "/view/:title",
      name: "view",
      component: ViewRecipe
    }
  ]
});
