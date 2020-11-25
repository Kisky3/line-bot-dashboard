<template>
  <div>
    <div class="c-btn-container">
      <div class="c-btn-content">
        <b-button
          size="sm"
          variant="dark"
          class="btn"
          @click="setAssessStatus('unknown')"
        >
          買取不明
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="btn"
          @click="setAssessStatus('notAvailable')"
        >
          買取不可
        </b-button>
      </div>

      <div class="c-btn-content">
        <b-button
          size="sm"
          variant="warning"
          class="btn"
          @click="setAssessStatus('sendTakaku')"
        >
          高くフォームを送信
        </b-button>
        <b-button
          size="sm"
          variant="warning"
          class="btn"
          @click="setAssessStatus('sendOikura')"
        >
          おいくらフォームを送信
        </b-button>
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
    }
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
.btn {
  margin: 5px 10px;
  width: 200px;
  border-radius: 15px;
}

.btn:hover {
  opacity: 0.7;
}
</style>
