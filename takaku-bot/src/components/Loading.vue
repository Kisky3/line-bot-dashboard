<template>
  <div class="loading-container" v-if="showLoading">
    <div class="loading-content">
      <div class="spinner-border text-info" role="status" />
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Loading",
  props: ["showLoading"]
});
</script>
<style>
.loading-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.loading-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  z-index: 11;
}

.loading-content > p {
  font-size: 30px;
  color: white;
  margin-top: 5px;
}

.spinner-border {
  width: 100px;
  height: 100px;
}
</style>
