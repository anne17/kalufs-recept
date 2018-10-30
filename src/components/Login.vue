<template>
  <div>
    <div id="grayout" class="hide" v-bind:class="{ show: grayoutShow }" @click="closeLogin"></div>
    <div class="login">
      <button type="button" v-bind:class="{ hide: buttonHide }" class="btn btn-default btn-sm dropdown-toggle show" v-on:click="openLogin">Login</button>
      <span class="hide" v-bind:class="{ hide: userShow }">
        Hej User!
      </span>
      <div class="login-box" v-if="!isHidden">
          <div class="login-box-body">
              <form v-on:submit.prevent="onSubmit">
                <div class="form-group has-feedback">
                  <input type="text" name="login" autofocus value="" v-model="form.login" placeholder="Username" class="form-control" id="login" maxlength="80" size="30">
                  <span class="glyphicon glyphicon-user form-control-feedback"></span>
                  <span><font color="red"></font></span>
                </div>
                <div class="form-group has-feedback">
                  <input type="password" name="password" value="" v-model="form.password" placeholder="Password" class="form-control" id="password" size="30">
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  <span><font color="red"></font></span>
                </div>
                <div class="row">
                  <div class="col-xs-8">
                    <div class="checkbox">
                      <!-- <label> -->
                        <input type="checkbox" name="remember" value="" id="remember" v-model="form.remember">
                        <label for="remember">Remember me</label>
                      <!-- </label> -->
                    </div>
                  </div><!-- /.col -->
                  <div class="col-xs-4">
                      <input type="submit" name="submit" value="Sign In" id="submit" class="btn btn-primary btn-block btn-flat">
                  </div><!-- /.col -->
                </div>
              </form>
          </div><!-- /.login-box-body -->
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
          this.closeLogin();
          // Display user logged in
        })
        .catch(error => {
          this.submitError(error);
          // this.disableSubmitLoader();
          // Display error message
        });
    },
    submitSuccess(response) {
      console.log(response.data);
      if (response.data.status == "success") {
        this.isSubmitted = true;
        this.isError = false;
        this.buttonHide = true;
        this.userShow = true;
        console.log(this.userShow);
      } else {
        this.errorHeader = "error.invalidFields";
        this.errors = response.data.status.message;
        console.log("success, error:", this.errors);
        this.isError = true;
      }
    },
    submitError(error) {
      this.errors = response.data.status.message;
      console.log("success, error:", this.errors);
      // this.errorHeader = error.general;
      // this.errors = [{ field: null, message: error.generalMessage }];
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
.login > button {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* body {
  height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
} */

.show {
  display: block;
}

.hide {
  display: none;
}

/* Gray out when login window opens */
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

.form-control {
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #999999;
  border-radius: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  color: #333333;
  display: block;
  font-size: 14px;
  height: 34px;
  line-height: 1.42857;
  padding: 6px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  width: 100%;
}

.login-box {
  z-index: 10000;
  border: 1px solid #999999;
  width: 360px;
  margin: 7% auto;
  position: fixed;
  display: block;
  left: 0;
  right: 0;
}

.login-box-body {
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
}

.has-feedback {
  position: relative;
}
.form-group {
  margin-bottom: 15px;
}

.has-feedback .form-control {
  padding-right: 42.5px;
}

.login-box-body .form-control-feedback,
.register-box-body .form-control-feedback {
  color: #777;
}

.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  pointer-events: none;
}

.checkbox,
.radio {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.checkbox label,
.radio label {
  min-height: 20px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: 400;
  cursor: pointer;
}
</style>
