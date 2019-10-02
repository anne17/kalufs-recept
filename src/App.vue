<template>
  <div id="app" class="app">
    <Header/>

    <div class="app-body">
      <router-view/>
    </div>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<!-- ####################################################################### -->

<style>
/* Global CSS variables */
:root {
  --standard-font-color: #444444;
  --bright-font-color: white;
  --placeholder-font-color: #808080;
  --light-background-color: ghostwhite;
  --dark-accent-color: #3866bf;
  --light-accent-color: #a5c3f2;
  --lightish-accent-color: #77a7f5;
  --lighter-accent-color: #c9dbf9;

  --light-contrast-color: #fff586;
  --warning-color: orange;

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

/* Stop page from jumping when setting overflow:hidden */
.app-body {
  margin-left: calc(100vw - 100%);
}

h1 {
  font-size: 1.6em;
  padding-top: 0.8em;
  margin: 0;
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
  border-color: var(--dark-accent-color);
  background: var(--dark-accent-color);
}

.tag-placeholder {
  border-color: unset;
  background: unset;
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

@media print {
  html, body {
    background-color: transparent;
  }
}
</style>
