<template>
  <div id="app" class="app">
    <Header />

    <div class="app-body">
      <router-view />
    </div>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"

export default {
  name: "app",
  components: {
    Header
  }
}
</script>

<!-- ####################################################################### -->

<style>
/* Global CSS variables */
:root {
  --standard-font-color: #3f3f3f;
  --standard-font-color-2: #626262;
  --bright-font-color: white;
  --placeholder-font-color: #808080;

  --light-background-color: #fdeddc;
  --light-background-color-2: #fbe1c6;

  --theme-color: #568648;
  --theme-color-4: #659a56;

  --primary-color-5: #a6b07e;
  --primary-color-4: #cad59e;

  --secondary-color-5: #ca7e2c;

  --warning-color: orange;

  --standardfont: "Krub", sans-serif;
  --monofont: "Roboto Mono", monospace;
  --headerfont: "Open Sans", sans-serif;
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

/* Stop page from jumping when setting overflow:hidden */
.app-body {
  margin-left: calc(100vw - 100%);
}

h1 {
  font-size: 1.6em;
  padding-top: 0.8em;
  margin: 0;
}

.caps-header {
  font-family: var(--headerfont);
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

/*Category tags (bubbles)*/
.tag {
  /*      top right bottom left */
  margin: 0em 0.3em 0em 0;
  padding: 0em 0.3em 0em 0.3em;
  font-size: 0.8rem;
  font-weight: bold;
  border-style: solid;
  border-radius: 15px;
  display: inline-block;
  color: white;
  border-color: var(--theme-color);
  background: var(--theme-color);
}

.tag-placeholder {
  border-color: unset;
  background: unset;
}

.btn-primary {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: var(--theme-color-4) !important;
  border-color: var(--theme-color-4) !important;
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

/* Gray out background when window opens */
.overlay {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: 9980;
}

@media print {
  html,
  body {
    background-color: transparent;
  }
}
</style>
