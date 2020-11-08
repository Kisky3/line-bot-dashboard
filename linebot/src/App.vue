<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>

import Vue from "vue";
import Header from "./components/Header.vue"
export default Vue.extend({
  name: 'App',
  components:{
    Header
  }
})
</script>
<style>
html, body {
  font-family: "arial black";
}
</style>