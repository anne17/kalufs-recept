import Vue from "vue"
import Router from "vue-router"
const Recipes = () => import("./views/Recipes.vue")
const EditRecipe = () => import("./views/EditRecipe.vue")
const ViewRecipe = () => import("./views/ViewRecipe.vue")
import { axios } from "./services.js"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "recipes",
      component: Recipes
    },
    {
      path: "/suggestions",
      name: "suggestions",
      component: Recipes,
      meta: {
        requiresAuth: true,
        allowGuest: true
      }
    },
    {
      path: "/stored",
      name: "stored",
      component: Recipes,
      meta: { requiresAuth: true }
    },
    {
      path: "/random",
      name: "random",
      component: Recipes
    },
    {
      path: "/edit/:title",
      name: "edit",
      component: EditRecipe,
      meta: { requiresAuth: true }
    },
    {
      path: "/suggest",
      name: "suggest",
      component: EditRecipe,
      meta: {
        requiresAuth: true,
        allowGuest: true
      }
    },
    {
      path: "/view/:title",
      name: "view",
      component: ViewRecipe
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 500)
      })
    } else if (to.params.savePosition) {
      return {}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth: check if logged in and redirect to login page.
    axios.post(Vue.prototype.$backend + "check_authentication").then(response => {
      if (response.data.authenticated) {
        if (!response.data.admin && !to.meta.allowGuest) {
          // Don't go here
          next({ path: from.path })
        } else {
          next()
        }
      } else {
        next({
          path: from.path + "#login",
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
