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
          class="btn"
          @click="setAssessStatus(4)"
          :disabled="disabled"
        >
          <b-icon icon="circle" aria-hidden="true"></b-icon>
          買取可能
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="btn"
          @click="setAssessStatus(1)"
          :disabled="disabled"
        >
         <b-icon icon="question" aria-hidden="true"></b-icon>
          不明
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="btn"
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
.btn {
  margin: 5px 10px;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  opacity: 0.7;
}

.disabled {
  pointer-events: none;
}
</style>
