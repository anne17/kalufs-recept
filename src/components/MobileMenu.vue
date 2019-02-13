<template>
  <Slide right width="350" class="sidebar">
    <div class="login-status">
      <span v-if="!loggedIn" class="do-login" @click="$emit('openLogin')">
        Logga in
      </span>
      <span v-if="loggedIn" @click="$emit('logout')" title="Logga ut">
        Logga ut {{ currentUser }}&nbsp;
        <i class="fas fa-sign-out-alt"></i>
      </span>
    </div>
  </Slide>
</template>

<!-- ####################################################################### -->

<script>
import { Slide } from "vue-burger-menu";

export default {
  name: "Header",
  components: {
    Slide
  },
  props: {
    loggedIn: Boolean,
    isHidden: Boolean,
    currentUser: String
  }
};
</script>

<!-- ####################################################################### -->

<style>
.sidebar .bm-burger-button {
  top: 18px;
  right: 10px !important;
  width: 20px;
  height: 15px;
 }
.sidebar .bm-burger-bars {
   background-color: white;
 }
.sidebar .bm-menu {
  height: 100vh;
  z-index: 1000; /* Stay on top */
  background-color: var(--light-background-color);
  transition: 0.3s;
}
.sidebar .bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 1.2em;
}
.sidebar .bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: var(--dark-accent-color);
}
/* .bm-overlay { */
  /* background: rgba(0, 0, 0, 0.3); */
  /* position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: 99; */
/* } */
</style>
