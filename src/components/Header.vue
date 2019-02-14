<template>
  <div class="header">

    <Login v-if="!isHidden" @close="closeLogin"/>

    <!-- Use headroom on narrow screens -->
    <headroom class="headroom d-lg-none">
      <header id="header" class="container">
        <div class="row">
          <!-- left column -->
          <div class="col-2">
          </div>
          <!-- middle column -->
          <div class="col-8 header-img-container">
            <router-link to="/" class="logo">
              <span>kalufs. </span>
              <img alt="Plate" src="../assets/plate-fork-and-knife_white.png">
              <span> /recept</span>
            </router-link>
          </div>
          <!-- right column -->
          <div class="col-2">
            <!-- Hamburger menu -->
            <MobileMenu :loggedIn="loggedIn" :isHidden="isHidden" :currentUser="currentUser" @openLogin="openLogin" @logout="logout"/>
          </div>
        </div>
      </header>
    </headroom>

    <!-- No headroom on large screens -->
    <header id="header" class="container d-none d-lg-block lg-screen-header">
      <div class="row">
        <!-- left column -->
        <div class="col-2">
        </div>
        <!-- middle column -->
        <div class="col-8 header-img-container">
          <router-link to="/" class="logo">
            <span>kalufs. </span>
            <img alt="Plate" src="../assets/plate-fork-and-knife_white.png">
            <span> /recept</span>
          </router-link>
        </div>
        <!-- right column -->
        <div class="col-2">
          <!-- Login feedback -->
          <div class="login-status d-none d-md-inline d-lg-inline">
            <span v-if="!loggedIn" class="do-login" v-on:click="openLogin">
              Logga in
            </span>
            <span  v-if="loggedIn">
              Hej {{ currentUser }}!&nbsp;
            </span>
            <span v-if="loggedIn" v-on:click="logout" title="Logga ut">
              <i class="fas fa-sign-out-alt"></i>
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="header-space d-none d-lg-block" />
  </div>
</template>

<!-- ####################################################################### -->
<script>
import { headroom } from "vue-headroom";

import Login from "@/components/Login.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import { axios, EventBus, LoginMixin } from "@/services.js";

export default {
  name: "Header",
  mixins: [LoginMixin],
  components: {
    Login,
    MobileMenu,
    headroom
  },
  mounted() {
    if (this.$route.hash == "#login") {
      document.body.style.overflowY = "hidden";
      this.isHidden = false;
    }
  },
  data() {
    return {
      isHidden: true,
    };
  },
  watch : {
    "$route" (to, from) {
      if (to.hash == "#login") {
        document.body.style.overflowY = "hidden";
        this.isError = false;
        this.isHidden = false;
      }
      if (from.hash == "#login" && to.hash != "#login") {
        document.body.style.overflowY = "auto";
        this.isHidden = true;
        this.isError = false;
      }
    }
  },
  methods: {
    openLogin() {
      this.$router.push({hash: "#login"});
      document.body.style.overflowY = "hidden";
      this.isError = false;
      this.isHidden = false;
    },
    closeLogin() {
      this.$router.push({hash: ""});
      document.body.style.overflowY = "auto";
      this.isHidden = true;
      this.isError = false;
    },
    logout() {
      axios
        .post(this.$backend + "logout")
        .then(response => {
          if (response.data.status == "success") {
            EventBus.$emit("login", {authenticated: false});
            this.loggedIn = false;
          } else {
            this.error = this.errorMessage(response.data.message);
          }
        })
        .catch(error => {
          console.error("Couldn't log out:", error);
          // Todo: popup with error message? http://test.keen-design.ru/vue-flash-message/
        });
    }
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
#header {
  background-color: var(--dark-accent-color);
  max-width: 100%;
  height: 50px;
  /* Stop page from jumping when setting overflow:hidden */
  padding-left: calc(100vw - 100%);
}

#header .row {
  height: 100%;
}

.headroom {
  z-index: 8888 !important;
}

.lg-screen-header {
  position: fixed;
  z-index: 8888;
}

.header-img-container {
  display: inline-block;
  height: 100%;
  white-space: nowrap;
  padding-left: 0px;
  padding-right: 0px;
}

.header-img-container img {
  height: 93%;
}

#header .logo {
  font-family: "Indie Flower", cursive;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.8rem;
  color: white;
}

.logo span {
  vertical-align: sub;
}

.header-space {
  height: 50px;
}

.login-status {
  color: white;
  font-weight: bold;
  float: right;
  position: absolute;
  right: 10%;
  top: 15px;
}

.login-status .do-login {
  cursor: pointer;
}

.login-status i {
  cursor: pointer;
  font-size: 1.3em;
  position: relative;
  top: 2px;
}
</style>
