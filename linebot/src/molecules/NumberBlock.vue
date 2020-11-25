<template>
  <div class='number-block'
   :class="{ 'red': color === 'red', 'green': color === 'green', 'yellow': color === 'yellow' }"
  >
    <label>{{label}}</label>
    <p>{{ number }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NumberBlock",
  props: ['color', 'number', 'label'],
});
</script>
<style>
label {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 30px;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.number-block {
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    margin-right: 30px;
    font-size: 18px;
    font-weight: bold;
}

.red {
  background: Crimson;
}

.green {
   background: #17A2B8;
}

.yellow {
    background: #ffc107;
}
</style>
