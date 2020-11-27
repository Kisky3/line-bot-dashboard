<template>
  <div
    class="number-block"
    :class="{
      red: color === 'red',
      green: color === 'green',
      yellow: color === 'yellow'
    }"
  >
     <label>
      <b-icon v-if="color === 'red'" icon="exclamation-circle" class="space"></b-icon>
      <b-icon v-if="color === 'green'" icon="patch-check" class="space"></b-icon>
      <b-icon v-if="color === 'yellow'" icon="file-text" class="space"></b-icon>
      {{ label }} :
    </label>
     <label class="number"> {{ number }} </label>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NumberBlock",
  props: ["color", "number", "label"]
});
</script>
<style>
label {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.number-block {
  width: 220px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: row;
  margin-right: 30px;
  font-size: 18px;
  font-weight: bold;
}

.number {
  font-size: 35px;
  margin: -5px 0 0 5px;
  font-family: Helvetica Arial;
}

.red {
  background: Crimson;
}

.green {
  background: #17a2b8;
}

.yellow {
  background: #ffc107;
}

.number {
  font-size: 20px;
}

</style>
