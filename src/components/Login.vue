<template>
<div>
  <div id="grayout" class="hide" v-bind:class="{ show: grayoutShow }" @click="closeLogin"></div>

  <div class="login">
    <button type="button" v-bind:class="{ hide: buttonHide }" class="btn btn-default btn-sm dropdown-toggle login-status" v-on:click="openLogin">Login</button>
    <span class="login-status hide" v-bind:class="{ show: userShow }">
      Hej {{ currentUser }}!
    </span>

  	<div class="modal-dialog modal-login" v-if="!isHidden">
  		<div class="modal-content">
  			<div class="modal-header">
  				<h4 class="modal-title">Member Login</h4>
  				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" v-on:click="closeLogin">&times;</button>
  			</div>
  			<div class="modal-body">
  				<form v-on:submit.prevent="onSubmit">
  					<div class="form-group">
  						<i class="fa fa-user"></i>
  						<input type="text" class="form-control" placeholder="Username" required="required" autofocus v-model="form.login">
  					</div>
  					<div class="form-group">
  						<i class="fa fa-lock"></i>
  						<input type="password" class="form-control" placeholder="Password" required="required" v-model="form.password">
  					</div>
            <div class="checkbox">
                <input type="checkbox" name="remember" value="" id="remember" v-model="form.remember">
                <label for="remember">Remember me</label>
            </div>
  					<div class="form-group">
  						<input type="submit" class="btn btn-primary btn-block btn-lg" value="Login">
  					</div>
            <div class="error" v-if="showError">
              {{ error }}
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
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      isHidden: true,
      grayoutShow: false,
      buttonHide: false,
      userShow: false,
      currentUser: "User",
      showError: false,
      form: {
        login: "",
        password: "",
        remember: true
      }
    };
  },
  methods: {
    openLogin: function() {
      this.isHidden = !this.isHidden;
      this.grayoutShow = true;
    },
    closeLogin: function() {
      this.isHidden = true;
      this.grayoutShow = false;
    },
    onSubmit: function() {
      // this.enableSubmitLoader();
      let formData = this.packageData(this.form);
      axios
        .post(this.$backend + "login", formData)
        .then(response => {
          this.submitSuccess(response);
          // this.disableSubmitLoader();
        })
        .catch(error => {
          this.submitError(error);
          // this.disableSubmitLoader();
          // Display error message
        });
    },
    submitSuccess(response) {
      if (response.data.status == "success") {
        this.isError = false;
        this.closeLogin();
        this.currentUser = response.data.user;
        this.buttonHide = true;
        this.userShow = true;
        // TODO: logout button
      } else {
        this.error = response.data.message;
        console.log("error:", this.error);
        this.showError = true;
        this.isError = true;
      }
    },
    submitError(error) {
      this.error = [{ message: error.generalMessage }];
      this.isError = true;
    },
    packageData: data => {
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      return form;
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
  /* position: fixed; */
  /* left: 0; */
  /* right: 0; */
}
.modal-login .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
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
.modal-login .modal-footer {
  background: #ecf0f1;
  border-color: #dee4e7;
  text-align: center;
  margin: 0 -20px -20px;
  border-radius: 5px;
  font-size: 13px;
  justify-content: center;
}
.modal-login .modal-footer a {
  color: #999;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
