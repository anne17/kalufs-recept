<template>
<div>
  <div id="grayout" v-if="grayoutShow" @click="closeLogin"></div>

  <div class="login">
    <!-- Login feedback large screen -->
    <div class="login-status d-none d-md-inline d-lg-inline">
      <span v-if="!loggedIn" v-on:click="openLogin" title="Logga in">
        <i class="fas fa-sign-in-alt"></i>
      </span>
      <span  v-if="loggedIn">
        Hej {{ currentUser }}!&nbsp;
      </span>
      <span v-if="loggedIn" v-on:click="logout" title="Logga ut">
        <i class="fas fa-sign-out-alt"></i>
      </span>
    </div>
    <!-- Login feedback small screen -->
    <div class="login-status d-inline d-lg-none d-md-none">
      <i class="fas fa-bars"></i>
    </div>

  	<div class="modal-dialog" v-if="!isHidden">
  		<div class="modal-content" v-bind:class="{ error: isError }">
        <div id="close-icon" v-on:click="closeLogin">
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
            <!-- <div class="checkbox">
                <input type="checkbox" name="remember" value="" id="remember" v-model="form.remember">
                <label for="remember">Kom ihåg mig</label>
            </div> -->
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
</div>
</template>

<!-- ####################################################################### -->

<script>
// https://vuejs.org/v2/examples/modal.html
// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=elegant-modal-login-form-with-icons
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "login",
  data() {
    return {
      loggedIn: false,
      isHidden: true,
      grayoutShow: false,
      currentUser: "User",
      isError: false,
      form: {
        login: "",
        password: "" //,
        // remember: true
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      axios
        .post(this.$backend + "check_authentication")
        .then(response => {
          if (response.data.authenticated == true) {
            this.loggedIn = true;
            this.currentUser = response.data.user;
          } else {
            this.loggedIn = false;
          }
        })
        .catch(error => {
          this.loggedIn = false;
          console.error(error);
        });
    },
    openLogin() {
      this.isHidden = !this.isHidden;
      this.grayoutShow = true;
    },
    closeLogin() {
      this.isHidden = true;
      this.grayoutShow = false;
      this.isError = false;
    },
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
    },
    logout() {
      axios
        .post(this.$backend + "logout")
        .then(response => {
          if (response.data.status == "success") {
            this.loggedIn = false;
          } else {
            this.error = this.errorMessage(response.data.message);
          }
        })
        .catch(error => {
          console.error("Couldn't log out:", error);
          // Todo: popup with error message? http://test.keen-design.ru/vue-flash-message/
        });
    }
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
.login-status {
  color: white;
  font-weight: bold;
  float: right;
  position: absolute;
  right: 5%;
  top: 15px;
}

.login-status i {
  cursor: pointer;
  font-size: 1.3em;
  position: relative;
  top: 2px;
}

.error .error-message {
  color: red;
  font-weight: bold;
}

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
