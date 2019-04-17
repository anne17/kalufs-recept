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
      currentUser: "",
      hasSuggestions: false,
      suggestions: [],
      nSuggestions: -1,
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
            if (response.data.admin == true) {
              this.admin = true;
              this.getSuggestions();
            } else {
              this.admin = false;
              this.hasSuggestions = false;
              this.nSuggestions = -1;
            }
          } else {
            this.setAllLogout();
          }
        })
        .catch(error => {
          this.setAllLogout();
          console.error(error);
        });
    },
    updateLoginStatus(authObject) {
      if (authObject.authenticated == true) {
        this.loggedIn = true;
        this.currentUser = authObject.user;
        if (authObject.admin == true) {
          this.admin = true;
          this.getSuggestions();
        } else {
          this.admin = false;
        }
      } else {
        this.setAllLogout();
      }
    },
    getSuggestions() {
      axios
        .get(this.$backend + "recipe_data", {params: {published: "false"}} )
        .then(response => {
          if (response.data.status !== "success"){
            this.hasSuggestions = false;
          } else {
            this.hasSuggestions = true;
            this.suggestions = response.data.data;
            this.nSuggestions = response.data.hits;
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response);
          this.hasSuggestions = false;
        });
    },
    setAllLogout() {
      this.loggedIn = false;
      this.currentUser = "";
      this.admin = false;
      this.hasSuggestions = false;
      this.nSuggestions = -1;
    }
  }
};

export const TagMixin = {
  data() {
    return {
      tagCateogires: [],
      tagStructure: []
    };
  },
  created() {
    this.getTagCategories();
    this.getTagStructure();
  },
  methods: {
    getTagCategories() {
      axios
        .get(this.$backend + "get_tag_categories")
        .then(response => {
          if (response.data.status == "success"){
            for (var i in response.data.data) {
              Vue.set(this.tagCateogires, i, response.data.data[i]);
            }
          }
        });
    },
    getTagStructure() {
      axios
        .get(this.$backend + "get_tag_structure")
        .then(response => {
          if (response.data.status == "success"){
            for (var i in response.data.data) {
              Vue.set(this.tagStructure, i, response.data.data[i]);
            }
          }
        });
    }
  }
};
