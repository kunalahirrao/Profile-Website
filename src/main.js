import Vue from "vue";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
// Solid Icons Only
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";
//Global Style
import "./styles/global.scss";
Vue.config.productionTip = false;
library.add(fas, fab);
dom.watch();

// Event bus
export const eventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");

