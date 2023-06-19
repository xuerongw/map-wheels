import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { key } from "./key";
Vue.config.productionTip = false;
Vue.prototype.key = key;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
