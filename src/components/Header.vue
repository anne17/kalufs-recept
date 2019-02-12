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
    <div class="headroom-space d-lg-none">
    </div>

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
    <div class="header-space d-none d-lg-block">
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import { headroom } from "vue-headroom";
import Login from "@/components/Login.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Header",
  components: {
    Login,
    MobileMenu,
    headroom
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    if (this.$route.hash == "#login") {
      this.toggleLogin();
    }
  },
  data() {
    return {
      loggedIn: false,
      isHidden: true,
      currentUser: "User"
    };
  },
  watch : {
    "$route" (to, from) {
      if (to.hash == "#login") {
        this.openLogin();
      }
      if (from.hash == "#login" && to.hash != "#login") {
        this.closeLogin();
      }
    }
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
    toggleLogin(login_success) {
      if (this.isHidden == true) {
        this.openLogin();
      } else {
        this.closeLogin();
      }
    },
    openLogin() {
      this.$router.push({hash: "#login"});
      document.body.style.overflowY = "hidden";
      this.isError = false;
      this.isHidden = false;
    },
    closeLogin(login_success) {
      this.$router.push({hash: ""});
      if (login_success == true) {
        this.loggedIn = true;
      }
      document.body.style.overflowY = "auto";
      this.isHidden = true;
      this.isError = false;
    },
    logout() {
      axios
        .post(this.$backend + "logout")
        .then(response => {
          if (response.data.status == "success") {
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

.headroom-space {
  height: 6vh;
}

.header-space {
  height: 5vh;
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
