<template>
  <div class="sideBarScreen">
    <div class="overlay" v-if="!hideSideBar" @click="closeHandler"></div>

    <div class="mobileSideBar" :class="{ shown: !hideSideBar, hidden: hideSideBar }">
      <button ref="closeButton" type="button" class="close" @click="closeHandler">&times;</button>

      <div class="sidebar-body">
        <div class="menu-row-header">
          <span>kalufs-recept</span>
        </div>

        <div class="container">
          <a class="row menu-row" v-if="!loggedIn" @click="clickedLogin">
            <i class="fas fa-sign-in-alt"></i>
            <span>Logga in</span>
          </a>

          <a class="row menu-row" v-if="loggedIn" @click="$emit('logout')" title="Logga ut">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logga ut {{ currentUser }}</span>
          </a>

          <router-link to="/suggestions" class="row menu-row active-bell" v-if="admin && hasSuggestions">
            <i class="fas fa-bell"></i>
            <span>Receptförslag</span>
          </router-link>

          <router-link to="/stored" class="row menu-row" v-if="admin">
            <i class="fas fa-bookmark"></i>
            <span>Sparade recept</span>
          </router-link>
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
  width: 45vh;
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
  transition: width 0.3s;
}
.close {
  padding-right: 10px;
  color: var(--bright-font-color);
  opacity: 0.9;
  font-size: 2em;
}
/* Hack to stop the close button from changing to gray */
.close:not(:disabled):not(.disabled):hover {
  color: var(--bright-font-color);
}
.sidebar-body {
  color: var(--bright-font-color);
  font-size: 1.2em;
}
.sidebar-body .row {
  padding: 0.7em 0 0.7em 0;
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

.menu-row-header {
  font-weight: bold;
  font-weight: bold;
  font-size: 1.5rem;
  font-family: "Indie Flower", cursive;
  padding: 0.8em 0 0.5em 0;
  background-color: var(--theme-color-1);
}

.menu-row {
  text-align: initial;
  cursor: pointer;
  border-top: 1px solid var(--theme-color-4);
}
.menu-row:first-child {
  border-top: unset;
}
.menu-row i {
  float: left;
  margin: 0 1em 0 1.5em;
  line-height: unset;
}
.menu-row:hover,
.menu-row a:hover {
  text-decoration: none;
  background-color: var(--theme-color-4);
}
</style>
