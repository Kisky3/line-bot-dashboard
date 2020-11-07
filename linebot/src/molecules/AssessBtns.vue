<template>
  <div>
    <div class="">
      <button class="m-1" @click="setAssessStatus('unknown')">
        買取不明
      </button>
      <button class="m-1"  @click="setAssessStatus('notAvailable')">
        買取不可
      </button>
      <button class="m-1"  @click="setAssessStatus('sendTakaku')">
        高くフォームを送信
      </button>
      <button class="m-1"  @click="setAssessStatus('sendOikura')">
        おいくらフォームを送信
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AssessBtns",
  props:['sendstatus'],
  methods: {
    setAssessStatus(status) {
      this.sendstatus(status);
    },
  }
});
</script>
<style>

</style>
