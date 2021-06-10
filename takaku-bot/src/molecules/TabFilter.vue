<template>
  <div class="number-block">
    <label v-on:click="tabFilter()" :class="{'active': active}">{{ label }} ({{ number }})</label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NumberBlock",
  props: ["number", "label", "active"],
  methods: {
    tabFilter() {
      this.$emit("tabFilter");
    }
  }
});
</script>
<style>
label {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 6px 35px 6px 35px;
  background: #343a40;
  margin-top: 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: solid 1px #dcdfe6;
  border-right: solid 1px #dcdfe6;
  transition: border-right 0.05s;
}
label:hover {
  cursor: pointer;
  background: #17a2b8;
  border-right: solid 1px #17a2b8;
}
.active {
  background: #17a2b8;
}
.number-block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: row;
  font-size: 15px;
  font-weight: bold;
}

.number {
  font-size: 35px;
  font-family: Helvetica Arial;
}
</style>
