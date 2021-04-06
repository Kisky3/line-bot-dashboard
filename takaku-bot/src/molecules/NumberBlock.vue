<template>
  <div class="number-block">
     <label>
      {{ label }} ({{ number }})
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NumberBlock",
  props: ["number", "label"]
});
</script>
<style>
label {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  margin-bottom : 0;
  padding: 0 20px 0 5px;
}
.number-block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: row;
  font-size: 15px;
  font-weight: bold;
  margin-right: 20px;
}

.number {
  font-size: 35px;
  font-family: Helvetica Arial;
}
</style>
