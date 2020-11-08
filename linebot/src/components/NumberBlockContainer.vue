<template>
  <div class='number-block-container'
  >
    <number-block color="yellow" label="すべて" :number="allNumber" />
    <number-block color="red" label="未返信" :number="unreplied" />
    <number-block color="green" label="返信済み" :number="replied" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberBlock from "../molecules/NumberBlock.vue";
export default Vue.extend({
  name: "NumberBlockContainer",
  props:['allNumber', 'replied', 'unreplied'],
  components: {
    NumberBlock
  }
});
</script>
<style>
.number-block-container {
 display: flex;
 justify-content: start;
 align-items: center;
 margin: auto;
 margin-top: 100px;
 max-width: 1210px;
}
</style>
