<template>
  <div class="recipies container">
    <div class="row">
      <div class="col-2 d-none d-lg-block left">

        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" disabled>
        </div>

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <h1>
          Alla recept
        </h1>
        <div class="container">
        <div class="menu row">

          <div class="input-group input-group-sm mb-3 col-6">
            <div class="input-group-prepend d-inline d-lg-none">
              <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
            </div>
            <input type="text" class="form-control d-inline d-lg-none" placeholder="Sök" disabled>
          </div>

          <div v-if="loggedIn" class="new-recipe-container col-6">
            <router-link class="new-recipe" :to="{ name: 'edit', params: {title: 'New'}}">
              <strong>&plus;</strong> Nytt recept
            </router-link>
          </div>
        </div>
        </div>
        <RecipiesList :loggedIn="loggedIn"/>
      </div>
      <!-- <div class="col-2 d-none d-lg-block right">
      </div> -->
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import RecipiesList from "@/components/RecipiesList.vue";
import { EventBus, axios } from "@/services.js";

export default {
  name: "recipies",
  components: {
    RecipiesList
  },
  data() {
    return {
      loggedIn: false
    };
  },
  created() {
    EventBus.$on("login", this.updateLoginStatus);
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      axios
        .post(this.$backend + "check_authentication")
        .then(response => {
          if (response.data.authenticated == true) {
            this.loggedIn = true;
            this.currentUser = response.data.user;
          } else {
            this.loggedIn = false;
          }
        })
        .catch(error => {
          this.loggedIn = false;
          console.error(error);
        });
    },
    updateLoginStatus(authObject) {
      if (authObject.authenticated == true) {
        this.loggedIn = true;
        this.currentUser = authObject.user;
      } else {
        this.loggedIn = false;
        this.currentUser = "";
      }
    },
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}

.new-recipe-container {
  text-align: right;
  padding-right: 0.2em;
}
.new-recipe {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
.new-recipe:hover {
  color: black;
}

.menu {
  margin-top: 0.4em;
}

.input-group {
  padding-left: 0;
}
</style>
