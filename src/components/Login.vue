<template>

  <div class="login">
    <button type="button" class="btn btn-default btn-sm dropdown-toggle" v-on:click="isHidden = !isHidden">Login</button>
    <div class="login-box" v-if="!isHidden">
        <div class="login-box-body">
            <form action="" v-on:submit="onSubmit" method="post" accept-charset="utf-8">        <div class="form-group has-feedback">
                <input type="text" name="login" value="" placeholder="Username" class="form-control" id="login" maxlength="80" size="30">            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                <span><font color="red"></font></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" name="password" value="" placeholder="Password" class="form-control" id="password" size="30">            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                <span><font color="red"></font></span>
            </div>
                    <div class="row">
                <div class="col-xs-8">
                    <div class="checkbox icheck">
                        <label>
                            <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
                            <input type="checkbox" name="remember" value="" id="remember" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"
                            ><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                            </div> <label for="remember" class="">Remember me</label>
                            </label>
                    </div>
                </div><!-- /.col -->
                <div class="col-xs-4">
                    <input type="submit" name="submit" value="Sign In" id="submit" class="btn btn-primary btn-block btn-flat">            </div><!-- /.col -->
            </div>
            </form>
        </div><!-- /.login-box-body -->
    </div>
  </div>
</template>

<!-- ####################################################################### -->

<script>
export default {
  name: "login",
  data() {
    return {
      isHidden: true
    };
  },
  methods: {
    onSubmit: function(event) {
      var formAction = this.$backend + "login";
      console.log(formAction);
    }
  }
};
</script>

<!-- ####################################################################### -->

<style scoped>
.login > button {
  float: right;
}

body {
  height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
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

.login-box,
.register-box {
  border: 1px solid #999999;
  width: 360px;
  margin: 7% auto;
}

.login-page,
.register-page {
  background: #d2d6de;
}

.login-logo,
.register-logo {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 300;
}

.login-box-body,
.register-box-body {
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

.icheck > label {
  padding-left: 0;
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
