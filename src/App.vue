<template>
  <div id="app" class="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/">Recipies</router-link> |
      <router-link to="/about">About</router-link>
      <Login/>
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

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
