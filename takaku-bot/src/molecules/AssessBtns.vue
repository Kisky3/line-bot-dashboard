<template>
  <div>
    <div
      class="c-btn-container"
      :class="{
        disabled: disabled
      }"
    >
      <div class="c-btn-content">
        <b-button
          size="sm"
          variant="warning"
          class="send-btn"
          @click="setAssessStatus(4)"
          :disabled="disabled"
        >
          <b-icon icon="circle" aria-hidden="true"></b-icon>
          買取可能
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="send-btn"
          @click="setAssessStatus(1)"
          :disabled="disabled"
        >
         <b-icon icon="question" aria-hidden="true"></b-icon>
          不明
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="send-btn"
          @click="setAssessStatus(2)"
          :disabled="disabled"
        >
          <b-icon icon="x" aria-hidden="true"></b-icon>
          買取不可
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AssessBtns",
  props: ["id", "disabled", "props"],
  methods: {
    async setAssessStatus(status) {
      this.$emit("setAssessStatus", this.id, status, this.props);
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
.send-btn {
  margin: 5px 10px;
  width: 70px;
  height: 65px;
  border-radius: 5px;
  display: flex;
  box-shadow: 0px 5px #666;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition-duration: 5s;
  transition: linear
}

.send-btn:hover {
  opacity: 0.6;
  height: 65px;
  box-shadow: none;
  margin-top: 10px;
  top: -5px;
}

.disabled {
  pointer-events: none;
}
</style>
