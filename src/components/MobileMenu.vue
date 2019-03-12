<template>
  <div ref="mobileSideBar" class="mobileSideBar" :class="{'shown': !hideSideBar, 'hidden': hideSideBar}">
    <button type="button" class="close" v-on:click="$emit('close')" aria-hidden="true">&times;</button>

      <div class="sidebar-body">
        <div class="login-status">
          <span v-if="!loggedIn" class="do-login" @click="$emit('openLogin')">
            Logga in
          </span>
          <span v-if="loggedIn" @click="$emit('logout')" title="Logga ut">
            Logga ut {{ currentUser }}&nbsp;
            <i class="fas fa-sign-out-alt"></i>
          </span>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "mobileSideBar",
  props: {
    hideSideBar: Boolean,
    loggedIn: Boolean,
    currentUser: String
  },
  created() {
    // Emit close event on ESC
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.$emit("close");
      }
    };
  }
};
</script>

<style scoped>
.hidden {
  width: 0%;
}
.shown {
  width: 85%;
}
.mobileSideBar {
  height: 100vh;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: auto;
  right: 0px;
  background-color: var(--light-background-color);
  overflow-x: hidden;
  padding-top: 60px;
  transition: width 0.3s;
}
.sidebar-body {
  color: var(--dark-accent-color);
  margin-left: 10%;
  font-size: 1.2em;
}
.sidebar-body > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.sidebar-body > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: var(--dark-accent-color);
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
