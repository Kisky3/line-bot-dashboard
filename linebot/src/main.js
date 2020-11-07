import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import VueGoodTablePlugin from 'vue-good-table'
import '@aws-amplify/ui-vue'
import aws_exports from './aws-exports'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import router from './router'

Amplify.configure(aws_exports)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueGoodTablePlugin)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
