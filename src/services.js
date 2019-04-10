import Vue from "vue";
export const EventBus = new Vue();

import axios from "axios";
axios.defaults.withCredentials = true;
export { axios };

export const LoginMixin = {
  // Provides functionality for checking authentication
  data() {
    return {
      loggedIn: false,
      admin: false,
      currentUser: ""
    };
  },
  created() {
    EventBus.$on("login", this.updateLoginStatus);
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
          if (response.data.admin == true) {
            this.admin = true;
          } else {
            this.admin = false;
          }
        })
        .catch(error => {
          this.loggedIn = false;
          this.admin = false;
          console.error(error);
        });
    },
    updateLoginStatus(authObject) {
      if (authObject.authenticated == true) {
        this.loggedIn = true;
        this.currentUser = authObject.user;
      } else {
        this.loggedIn = false;
        this.currentUser = "";
      }
      if (authObject.admin == true) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    },
  }
};
