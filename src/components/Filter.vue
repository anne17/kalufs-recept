<template>
  <div class="filter">
    <div class="overlay" @click="$emit('close')"></div>
    <span> FILTER </span>


  </div>

</template>

<!-- ####################################################################### -->

<script>
export default {
  name: "filter",
  props: {
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

<!-- ####################################################################### -->

<style scoped>
/* Gray out background when window opens */
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

</style>
