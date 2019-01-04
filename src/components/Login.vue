<template>
<div>
  <div id="grayout" class="hide" v-bind:class="{ show: grayoutShow }" @click="closeLogin"></div>

  <div class="login">
    <button type="button" v-if="!loggedIn" class="btn btn-default btn-sm dropdown-toggle login-status" v-on:click="openLogin">Logga in</button>
    <span class="login-status" v-if="loggedIn">
      Hej {{ currentUser }}!
    </span>
    <button type="button" v-if="loggedIn" class="btn btn-default btn-sm dropdown-toggle login-status" v-on:click="logout">Logga ut</button>
  	<div class="modal-dialog modal-login" v-if="!isHidden">
  		<div class="modal-content" v-bind:class="{ error: isError }">
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
// https://auralinna.blog/post/2018/how-to-build-a-complete-form-with-vue-js
// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=elegant-modal-login-form-with-icons
// https://blog.sqreen.io/authentication-best-practices-vue/
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
          if (response.data.status == "success") {
            this.loggedIn = true;
            this.currentUser = response.data.user;
          } else {
            this.loggedIn = false;
          }
        })
        .catch(error => {
          this.loggedIn = false;
          console.log(error);
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
      let formData = this.packageData(this.form);
      axios
        .post(this.$backend + "login", formData)
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
    packageData(data) {
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      return form;
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
          console.log("Couldn't log out:", error);
          // Todo: popup with error message? http://test.keen-design.ru/vue-flash-message/
        });
    }
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
.login-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

span.login-status {
  color: white;
  font-weight: bold;
  top: 15px;
  right: 90px;
}

.error .error-message {
  color: red;
  font-weight: bold;
}

.show {
  display: block;
}

.hide {
  display: none;
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

.modal-login {
  color: #636363;
  width: 350px;
  z-index: 10000;
  display: block;
  margin: 7% auto;
}
@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: red;
  }
}
.modal-login .modal-content {
  padding: 15px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
}
.modal-login .error {
  animation: blink 1s 2 alternate;
}
.modal-login .modal-header {
  border-bottom: none;
  position: relative;
  justify-content: center;
}
.modal-login h4 {
  text-align: center;
  font-size: 26px;
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
  border-color: #00ce81;
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
  position: absolute;
  top: -5px;
  right: -5px;
}
.modal-login .btn {
  background: #00ce81;
  border: none;
  line-height: normal;
}
.modal-login .btn:hover,
.modal-login .btn:focus {
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
