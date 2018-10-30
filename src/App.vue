<template>
  <div id="app" class="app">
    <div id="header" class="container">
      <div class="row">
        <!-- left column -->
        <div class="col-4">
        </div>
        <!-- middle column -->
        <div class="col-4 header-img-container">
          <img alt="Plate" src="./assets/plate-fork-and-knife_white.png">
        </div>
        <!-- right column -->
        <div class="col-4">
          <Login/>
        </div>
        <!-- <router-link to="/home">Home</router-link> |
        <router-link to="/">Recipies</router-link> |
        <router-link to="/about">About</router-link> -->
      </div>
    </div>
    <router-view/>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "app",
  components: {
    Login
  }
};
</script>

<!-- ####################################################################### -->

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: "Krub", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header {
  background-color: #5f8fe9;
  width: 100%;
  height: 50px;
}

.header-img-container {
  display: inline-block;
}

.header-img-container > img {
  height: 50px;
}

/* #header a {
  font-weight: bold;
  color: #2c3e50;
}

#header a.router-link-exact-active {
  color: #42b983;
} */

/* @media (min-width: 858px) {
  html {
    font-size: 15px;
  }
}

@media (min-width: 780px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 702px) {
  html {
    font-size: 13px;
  }
}

@media (min-width: 724px) {
  html {
    font-size: 12px;
  }
}

@media (max-width: 623px) {
  html {
    font-size: 11px;
  }
} */
</style>
