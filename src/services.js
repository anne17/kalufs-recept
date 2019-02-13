import Vue from "vue";
export const EventBus = new Vue();

import axios from "axios";
axios.defaults.withCredentials = true;
export { axios };
