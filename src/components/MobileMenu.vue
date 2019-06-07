<template>
  <div class="sideBarScreen">
    <div class="overlay" v-if="!hideSideBar" @click="closeHandler"></div>

    <div class="mobileSideBar" :class="{'shown': !hideSideBar, 'hidden': hideSideBar}" v-touch:swipe.right="closeHandler" v-touch:swipe.left="openHandler">

    <button ref="closeButton" type="button" class="close" @click="closeHandler">&times;</button>

        <div class="sidebar-body">
          <div class="container">

            <div class="row">
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

            <div class="row" v-if="admin && hasSuggestions">
              <span v-if="admin && hasSuggestions" class="bell active-bell">
                <router-link to="/suggestions">
                  Visa förslag &nbsp;
                  <i class="fas fa-bell"></i>&nbsp;
                </router-link>
              </span>
              <span v-if="admin && !hasSuggestions" title="Inga nya förslag" class="bell inactive-bell">
                <i class="fas fa-bell"></i>&nbsp;
              </span>
            </div>

          </div>
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
    currentUser: String,
    admin: Boolean,
    hasSuggestions: Boolean,
    nSuggestions: Number
  },
  created() {
    // Emit close event on ESC
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.$emit("close");
      }
    };
  },
  methods: {
    closeHandler() {
      this.$refs.closeButton.blur();
      this.$emit("close");
    },
    openHandler() {
      this.$emit("open");
    }
  }
};
</script>

<style scoped>
.sideBarScreen {
  overflow: hidden;
}

.overlay {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: 9999;
}

.hidden {
  width: 5%;
  opacity: 0;
  margin-top: 50px;
}
.shown {
  width: 85%;
}
.mobileSideBar {
  height: 100%;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: auto;
  right: 0px;
  background-color: var(--dark-accent-color);
  overflow-x: hidden;
  padding-top: 10px;
  transition: width 0.3s;
}
.close {
  padding-right: 10px;
  color: var(--light-background-color);
  opacity: 0.9;
}
/* Hack to stop the color button from changing to gray */
.close:not(:disabled):not(.disabled):hover {
  color: var(--light-background-color);
}
.sidebar-body {
  color: var(--light-background-color);
  margin-left: 10%;
  font-size: 1.2em;
  padding-top: 2em;
}
.sidebar-body .row {
  padding: 0.3em;
}

.sidebar-body a {
  color: var(--bright-font-color);
}

.login-status .do-login {
  padding-top: 40px;
  cursor: pointer;
}
.login-status i {
  cursor: pointer;
  font-size: 1.3em;
  position: relative;
  top: 2px;
}

.active-bell i {
  color: var(--warning-color);
}

.inactive-bell i {
  color: var(--lightish-accent-color);
  cursor: default !important;
}
</style>
