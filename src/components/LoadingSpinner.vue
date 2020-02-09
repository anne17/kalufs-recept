<template>
  <div class="loading-spinner" v-if="loading">
    <img src="../assets/loading_spinner.svg" />
  </div>
</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "LoadingSpinner",
  props: ["loading"]
}
</script>

<!-- ####################################################################### -->

<style scoped>
.loading-spinner {
  width: 10em;
  z-index: 20000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-spinner img {
  width: 10em;
}
</style>
