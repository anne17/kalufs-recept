<template>
  <div class="confirm">
    <div id="grayout" @click="$emit('close')"></div>

    <div id="ConfirmModal">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <button type="button" class="close" v-on:click="$emit('close')" aria-hidden="true">&times;</button>
          <div class="modal-body container">

            <div class="message"> Välj en kategori för taggen "{{ tag }}" </div>

            <div class="dropdown">
              <select v-model="chosenCat">
                <option v-for="cat in categories" :key="cat.id" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div class="row">
              <div class="col-4"/>
              <div class="col-4">
                <button type="button" class="btn btn-primary btn-block" v-on:click="$emit('confirm', chosenCat)">
                  Ok
                </button>
              </div>
              <div class="col-4"/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<!-- ####################################################################### -->

<script>
export default {
  name: "confirm",
  data() {
    return {
      chosenCat: ""
    };
  },
  props: {
    tag: String,
    categories: Array,
    defaultCat: String
  },
  created() {
    // Emit close event on ESC
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.$emit("close");
      }
    };
    // Set default choice
    this.chosenCat = this.defaultCat;
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
/* Gray out background when window opens */
#grayout {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: 9999;
}

.modal-confirm {
  color: #636363;
  width: 350px;
  z-index: 10000;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0%);
}
.modal-dialog {
  margin: 0;
}
.modal-confirm .modal-content {
  padding: 15px 15px 5px 15px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
}
.modal-confirm i {
  position: absolute;
  left: 13px;
  top: 11px;
  font-size: 18px;
}
.modal-confirm .close {
  position: fixed;
  top: 8px;
  right: 10px;
}
.modal-confirm .btn {
  background: var(--dark-accent-color);
  border: none;
}
.modal-confirm .btn:hover,
.modal-confirm .btn:focus {
  background: var(--lightish-accent-color);
}

.message {
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 1em;
}

.dropdown {
  padding-bottom: 20px;
  display: inline-block;
  position: relative;
}
.dropdown select {
  background-color: white;
  border: 1px solid #ccc;
  padding: 6px 20px 6px 10px;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none; /* remove default caret on Safari and Chrome */
  -moz-appearance:none; /* remove default caret on Firefox */
  background: transparent;
}
.dropdown::after{
  position: absolute;
  top: 30%;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #023F55;
  content: "";
  pointer-events: none;
}
</style>
