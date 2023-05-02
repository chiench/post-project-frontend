import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import ToastedPlugin from "vue-toasted";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(ToastedPlugin, {
  duration: 2000,
  theme: "bubble",
  position: "bottom-center",
  keepOnHover: true,
});
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
