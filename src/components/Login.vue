<template>
  <div class="login">
    <div class="overlay" @click="$emit('close')"></div>

    <div id="LoginModal">
      <div class="modal-dialog modal-login">
        <div class="modal-content" v-bind:class="{ error: isError }">
          <button type="button" class="close" v-on:click="$emit('close')" aria-hidden="true">&times;</button>
          <div class="modal-body">
            <form v-on:submit.prevent="onSubmit">
              <div class="form-group">
                <i class="fa fa-user"></i>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Användarnamn"
                  v-model="form.login"
                  autofocus
                  required="required"
                  oninvalid="this.setCustomValidity('Ange ditt användarnamn')"
                  oninput="setCustomValidity('')"
                  title=""
                />
              </div>
              <div class="form-group">
                <i class="fa fa-lock"></i>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Lösenord"
                  v-model="form.password"
                  required="required"
                  oninvalid="this.setCustomValidity('Ange ditt lösenord')"
                  oninput="setCustomValidity('')"
                  title=""
                />
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-primary btn-block btn-lg" value="Logga in" />
              </div>
            </form>

            <span class="loading-spinner" v-if="loading">
              <img src="../assets/loading_spinner.svg" />
            </span>

            <div class="error-message">
              <span v-if="isError">{{ error }}</span>
              <span v-if="!isError">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ####################################################################### -->

<script>
// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=elegant-modal-login-form-with-icons
import { EventBus, axios } from "@/services.js"

export default {
  name: "login",
  data() {
    return {
      error: "",
      isError: false,
      loading: false,
      form: {
        login: "",
        password: ""
      }
    }
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
    onSubmit() {
      this.isError = false
      this.loading = true
      var form_data = new FormData()
      for ( var key in this.form ) {
        form_data.append(key, this.form[key])
      }
      axios
        .post(this.$backend + "login", form_data)
        .then((response) => {
          this.loading = false
          this.username = response.data.user
          this.admin = response.data.admin
          EventBus.$emit("login", { authenticated: true, user: this.username, admin: this.admin })
          // Go to requested page (or stay on current page if there is no redirect)
          this.$router.push({ path: this.$route.query.redirect })
        })
        .catch((e) => {
          this.isError = true
          this.loading = false
          if (typeof e.response !== "undefined" && e.response.data.message == "Invalid username or password!") {
            this.error = "Felaktigt lösenord eller användarnamn!"
          } else {
            this.error = "Ett oväntat fel har inträffat :("
            console.error("Response from backend:", e.response)
          }
        })
    }
  }
}
</script>

<!-- ####################################################################### -->

<style scoped>
.modal-login {
  width: 350px;
  z-index: 10000;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0%);
}
@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: red;
  }
}
.modal-dialog {
  margin: 0;
}
.modal-dialog .error {
  animation: blink 1s 2 alternate;
}
.modal-login .modal-content {
  padding: 15px 15px 5px 15px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
}
.modal-login .form-group {
  position: relative;
}
.modal-login i {
  position: absolute;
  left: 13px;
  top: 11px;
  font-size: 18px;
}
.modal-login .form-control {
  padding-left: 40px;
}
.modal-login .form-control:focus {
  border-color: var(--theme-color);
}
.modal-login .form-control,
.modal-login .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-login .hint-text {
  text-align: center;
  padding-top: 10px;
}
.modal-login .close {
  position: fixed;
  top: 8px;
  right: 10px;
}
.modal-login .btn {
  background: var(--theme-color);
  border: none;
  line-height: normal;
  font-weight: bolder;
}

.loading-spinner img {
  width: 5em;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error-message {
  color: red;
  font-weight: 500;
  font-size: 0.9em;
}
</style>
