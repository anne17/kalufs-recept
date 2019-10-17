<template>
  <div class="confirm">
    <div class="overlay" @click="$emit('close')"></div>

    <div id="ConfirmModal">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <button type="button" class="close" v-on:click="$emit('close')" aria-hidden="true">&times;</button>
          <div class="modal-body container">

            <div class="message"> {{ message }} </div>

              <div v-if="showCancel" class="row">
                <div class="col-1"/>

                <div class="col-5">
                  <button type="button" class="btn btn-primary btn-block" v-on:click="$emit('confirm')">
                    {{ confirmButton }}
                  </button>
                </div>

                <div class="col-5">
                  <button type="button" class="btn btn-primary btn-block" v-on:click="$emit('close')">
                    {{ abortButton }}
                  </button>
                </div>

                <div class="col-1"/>
              </div>

              <div v-if="!showCancel" class="row">
                <div class="col-4"/>
                <div class="col-4">
                  <button type="button" class="btn btn-primary btn-block" v-on:click="$emit('confirm')">
                    {{ confirmButton }}
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
  props: {
    message: String,
    showCancel: {
      type: Boolean,
      default: true
    },
    confirmButton: {
      type: String,
      default: "Ok"
    },
    abortButton: {
      type: String,
      default: "Avbryt"
    }
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

.message {
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 1em;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: var(--theme-color-4) !important;
  border-color: var(--theme-color-4) !important;
}
</style>
