<template>
  <div id="app" class="app">
    <div id="header" class="container">
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
    </div>
    <router-view/>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
// import MobileMenu from "@/components/MobileMenu.vue";

export default {
  name: "app",
  components: {
    Login
  }
};
</script>

<!-- ####################################################################### -->

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Krub", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: ghostwhite;
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
  height: 100%;
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

h1 {
  font-size: 1.6rem;
}

.middle {
  margin-top: 0.8em;
}

/* padding side-bars */
.right,
.left {
  padding-top: 0.8em;
  padding-bottom: 0.8em;
}

.left {
  border-left: thin solid #ccc;
}

.right {
  border-right: thin solid #ccc;
}
</style>
