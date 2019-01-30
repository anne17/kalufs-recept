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
    <header id="header" class="container d-none d-lg-block lg-screen-header">
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
    <div class="header-space d-none d-lg-block">
    </div>

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
/* Global CSS variables */
:root {
  --standard-font-color: #444444;
  --light-background-color: ghostwhite;
  --dark-accent-color: #3866bf;
  --light-accent-color: #a5c3f2;
  --light-contrast-color: #fff586;

  --standardfont: "Krub", sans-serif;
  --monofont: "Roboto Mono", monospace;
}

html,
body {
  height: 100%;
  background-color: var(--light-background-color);
}
#app {
  font-family: "Krub", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--standard-font-color);
  min-height: 100%;
}

#header {
  background-color: var(--dark-accent-color);
  max-width: 100%;
  height: 50px;
}

#header .row {
  height: 100%;
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

h1 {
  font-size: 1.6em;
  padding-top: 0.8em;
  margin: 0;
}

/*Category tags (bubbles)*/
.tag,
.tag-dark {
  /*      top right bottom left */
  margin: 0.3em 0.3em 0.3em 0;
  padding: 0em 0.3em 0em 0.3em;
  font-size: 0.8rem;
  font-weight: bold;
  border-style: solid;
  border-radius: 15px;
  display: inline-block;
}
.tag {
  border-color: var(--light-contrast-color);
  background: var(--light-contrast-color);
}
.tag-dark {
  color: white;
  border-color: var(--dark-accent-color);
  background: var(--dark-accent-color);
}

.button-danger-secondary {
  background-color: unset !important;
  color: #dc3545 !important;
  border: 1px solid #ced4da !important;
  /* border: 1px solid #dc3545 !important; */
}

.dont-break-out {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
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
