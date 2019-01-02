import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Recipies from "./views/Recipies.vue";
import EditRecipe from "./views/EditRecipe.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      name: "recipies",
      component: Recipies
    },
    {
      path: "/edit",
      name: "recipies",
      component: EditRecipe
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
