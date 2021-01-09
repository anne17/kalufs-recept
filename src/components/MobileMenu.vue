<template>
  <div class="sideBarScreen">
    <div class="overlay" v-if="!hideSideBar" @click="closeHandler"></div>

    <div
      class="mobileSideBar"
      :class="{ shown: !hideSideBar, hidden: hideSideBar }"
      v-touch:swipe.right="closeHandler"
      v-touch:swipe.left="openHandler"
    >
      <button ref="closeButton" type="button" class="close" @click="closeHandler">&times;</button>

      <div class="sidebar-body">
        <div class="container">
          <div class="row menu-row" v-if="!loggedIn" @click="clickedLogin">
            <a>
              <i class="fas fa-sign-in-alt col-1"></i>
              <span class="col-11">Logga in</span>
            </a>
          </div>

          <div class="row menu-row" v-if="loggedIn" @click="$emit('logout')" title="Logga ut">
            <a>
              <i class="fas fa-sign-out-alt col-1"></i>
              <span class="col-11">Logga ut {{ currentUser }}</span>
            </a>
          </div>

          <div class="row menu-row active-bell" v-if="admin && hasSuggestions">
            <router-link to="/suggestions">
              <i class="fas fa-bell col-1"></i>
              <span class="col-11">Visa förslag</span>
            </router-link>
          </div>

          <div class="row menu-row" v-if="admin">
            <router-link to="/stored">
              <i class="fas fa-bookmark col-1"></i>
              <span class="col-11">Visa sparade recept</span>
            </router-link>
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
    document.onkeydown = (evt) => {
      evt = evt || window.event
      if (evt.keyCode == 27) {
        this.$emit("close")
      }
    }
  },
  methods: {
    closeHandler() {
      this.$refs.closeButton.blur()
      this.$emit("close")
    },
    openHandler() {
      this.$emit("open")
    },
    clickedLogin() {
      this.$emit("close")
      this.$emit("openLogin")
    }
  }
}
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
  width: 48vh;
}
.mobileSideBar {
  height: 100%;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: auto;
  right: 0px;
  background-color: var(--theme-color);
  overflow-x: hidden;
  padding-top: 10px;
  transition: width 0.3s;
}
.close {
  padding-right: 10px;
  color: var(--bright-font-color);
  opacity: 0.9;
}
/* Hack to stop the close button from changing to gray */
.close:not(:disabled):not(.disabled):hover {
  color: var(--bright-font-color);
}
.sidebar-body {
  color: var(--bright-font-color);
  margin-left: 0.5em;
  font-size: 1.2em;
  padding-top: 2em;
}
.sidebar-body .row {
  padding: 0.3em;
}

.sidebar-body a {
  color: var(--bright-font-color);
}

.active-bell i {
  color: var(--warning-color);
}

.inactive-bell i {
  color: var(--primary-color-4);
  cursor: default !important;
}

.menu-row i {
  float: left;
}
.menu-row {
  text-align: initial;
  cursor: pointer;
}
.menu-row:hover{
  text-decoration: underline;
}
</style>
