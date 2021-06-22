<template>
  <div id="app">
    <Header />
    <amplify-authenticator>
    <router-view/>
    </amplify-authenticator>
  </div>
</template>

<script>

import Vue from "vue";
import Header from "./components/Header.vue"
import "./index.scss";

export default Vue.extend({
  name: 'App',
  components:{
    Header
  }
})
</script>
<style ls="scss">
html, body {
  font-family: "arial black";
  font-size: 15px;
  min-width: 960px;
}

</style>