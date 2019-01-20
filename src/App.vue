<template>
  <div id="app" class="app">

    <!-- Use headroom on narrow screens -->
    <headroom class="d-lg-none">
      <header id="header" class="container">
        <div class="row">
          <!-- left column -->
          <div class="col-2">
          </div>
          <!-- middle column -->
          <div class="col-8 header-img-container">
            <router-link to="/" class="logo">
              <span>kalufs. </span>
              <img alt="Plate" src="./assets/plate-fork-and-knife_white.png">
              <span> /recept</span>
            </router-link>
          </div>
          <!-- right column -->
          <div class="col-2">
            <Login/>
          </div>
        </div>
      </header>
    </headroom>
    <div class="headroom-space d-lg-none">
    </div>

    <!-- No headroom on large screens -->
    <header id="header" class="container d-none d-lg-block">
      <div class="row">
        <!-- left column -->
        <div class="col-2">
        </div>
        <!-- middle column -->
        <div class="col-8 header-img-container">
          <router-link to="/" class="logo">
            <span>kalufs. </span>
            <img alt="Plate" src="./assets/plate-fork-and-knife_white.png">
            <span> /recept</span>
          </router-link>
        </div>
        <!-- right column -->
        <div class="col-2">
          <Login/>
        </div>
      </div>
    </header>

    <router-view/>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// @ is an alias to /src
import { headroom } from "vue-headroom";
import Login from "@/components/Login.vue";
// import MobileMenu from "@/components/MobileMenu.vue";

export default {
  name: "app",
  components: {
    Login,
    headroom
  }
};
</script>

<!-- ####################################################################### -->

<style>
html,
body {
  height: 100%;
  background-color: ghostwhite;
}
#app {
  font-family: "Krub", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
#header {
  background-color: #3866bf;
  max-width: 100%;
  height: 50px;
}

#header .row {
  height: 100%;
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

h1 {
  font-size: 1.6rem;
  padding-top: 0.8em;
  margin: 0;
}

/* padding side-bars */
.right,
.left {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

/* .left {
  border-right: thin solid #ccc;
}

.right {
  border-left: thin solid #ccc;
} */

/* Reduce fat margins */
/* @media (min-width: 1200px) {
  .main-container {
    max-width: 1180px;
  }
} */
</style>
