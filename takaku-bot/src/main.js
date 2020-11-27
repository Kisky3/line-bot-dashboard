import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import App from './App.vue'
import {Amplify, I18n} from 'aws-amplify'
import VueGoodTablePlugin from 'vue-good-table'
import '@aws-amplify/ui-vue'
import aws_exports from './aws-exports'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import router from './router'
import { messages } from "./i18n/amplify/messages";

Amplify.configure(aws_exports)
I18n.putVocabularies(messages);
I18n.setLanguage("ja");
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueGoodTablePlugin)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
