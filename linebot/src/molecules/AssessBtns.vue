<template>
  <div>
    <div class="c-btn-container">
      <div class="c-btn-content">
        <button
       class="c-arrow-btn"
        @click="setAssessStatus('unknown')"
      >
        買取不明
      </button>
      <button
       class="c-arrow-btn"
        @click="setAssessStatus('notAvailable')"
      >
        買取不可
      </button>
      </div>

 <div class="c-btn-content">
      <button
       class="c-arrow-btn"
        @click="setAssessStatus('sendTakaku')"
      >
        高くフォームを送信
      </button>
      <button
       class="c-arrow-btn"
        @click="setAssessStatus('sendOikura')"
      >
        おいくらフォームを送信
      </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AssessBtns",
  methods: {
    setAssessStatus(status) {
      this.sendstatus(status);
    },
  }
});
</script>
<style lang="scss">
  .c-btn-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .c-btn-content {
     display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }
  .c-arrow-btn {
  position: relative;
  width: 200px;
  background: linear-gradient(#ff9b27, #fb7150);
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  height: 32px;
  border: none;
  margin: 0 10px 10px;
  border-radius: 15px;
}

.color .red    {background: #fa5a5a;}
.color .yellow {background: #f5c516 ;}
.color .green  {background: #82c8a0;}
.color .cyan   {background: #f39103;}
.color .blue   {background: #6698cb;}
.color .purple {background: #cb99c5;}

.btn-gradient.green:active  {background: #72B08E;}
</style>
