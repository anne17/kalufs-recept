<template>
  <div class="login">
    <div id="grayout" @click="$emit('close')"></div>

  	<div class="modal-dialog">
  		<div class="modal-content" v-bind:class="{ error: isError }">
        <div id="close-icon" v-on:click="$emit('close', loggedIn)">
          <i class="far fa-times-circle"></i>
        </div>
  			<div class="modal-body">
  				<form v-on:submit.prevent="onSubmit">
  					<div class="form-group">
  						<i class="fa fa-user"></i>
  						<input type="text" class="form-control" placeholder="Användarnamn" required="required" autofocus v-model="form.login">
  					</div>
  					<div class="form-group">
  						<i class="fa fa-lock"></i>
  						<input type="password" class="form-control" placeholder="Lösenord" required="required" v-model="form.password">
  					</div>

  					<div class="form-group">
  						<input type="submit" class="btn btn-primary btn-block btn-lg" value="Login">
  					</div>
            <div class="error error-message" v-if="isError">
              {{ error }}
            </div>
            <div class="error error-message" v-if="!isError">
              &nbsp;
            </div>
  				</form>
  			</div>
  		</div>
    </div>
	</div>

</template>

<!-- ####################################################################### -->

<script>
// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=elegant-modal-login-form-with-icons
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "login",
  data() {
    return {
      loggedIn: false,
      currentUser: "User",
      isError: false,
      form: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.isError = false;
      axios
        .post(this.$backend + "login", this.form)
        .then(response => {
          this.closeLogin();
          this.currentUser = response.data.user;
          this.loggedIn = true;
        })
        .catch(e => {
          this.isError = true;
          if (
            typeof e.response !== "undefined" &&
            e.response.data.message == "Invalid username or password!"
          ) {
            this.error = "Felaktigt lösenord eller användarnamn!";
          } else {
            this.error = "Ett oväntat fel har inträffat :(";
          }
        });
    }
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
/* Gray out background when login window opens */
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

.error .error-message {
  color: red;
  font-weight: bold;
}

.modal-dialog {
  color: #636363;
  width: 350px;
  z-index: 10000;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
}
#close-icon i {
  position: unset;
  float: right;
  cursor: pointer;
}
@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: red;
  }
}
.modal-dialog .modal-content {
  padding: 15px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
}
.modal-dialog .error {
  animation: blink 1s 2 alternate;
}
.modal-dialog .modal-header {
  border-bottom: none;
  position: relative;
  justify-content: center;
}
.modal-dialog h4 {
  text-align: center;
  font-size: 26px;
}
.modal-dialog .form-group {
  position: relative;
}
.modal-dialog i {
  position: absolute;
  left: 13px;
  top: 11px;
  font-size: 18px;
}
.modal-dialog .form-control {
  padding-left: 40px;
}
.modal-dialog .form-control:focus {
  border-color: #00ce81;
}
.modal-dialog .form-control,
.modal-dialog .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-dialog .hint-text {
  text-align: center;
  padding-top: 10px;
}
.modal-dialog .close {
  position: absolute;
  top: -5px;
  right: -5px;
}
.modal-dialog .btn {
  background: #00ce81;
  border: none;
  line-height: normal;
}
.modal-dialog .btn:hover,
.modal-dialog .btn:focus {
  background: #00bf78;
}
.modal-body {
  padding-bottom: 5px;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
