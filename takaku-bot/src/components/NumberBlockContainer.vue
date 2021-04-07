<template>
  <div class="number-block-container">
    <number-block label="すべて" :number="allNumber" />
    <number-block  label="未返信" :number="unreplied" />
    <number-block label="返信済み" :number="replied" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberBlock from "../molecules/NumberBlock.vue";
export default Vue.extend({
  name: "NumberBlockContainer",
  props: ["allNumber", "replied", "unreplied"],
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
}
</style>
