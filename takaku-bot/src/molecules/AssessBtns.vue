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
          class="send-btn green"
          @click="setAssessStatus(4)"
          :disabled="disabled"
        >
          <b-icon icon="circle" class="b-icon-sm" aria-hidden="true"></b-icon>
          買取可能
        </b-button>
        <b-button
          size="sm"
          class="send-btn white"
          @click="setAssessStatus(1)"
          :disabled="disabled"
        >
         <b-icon icon="question" class="b-icon" aria-hidden="true"></b-icon>
          不明
        </b-button>
        <b-button
          size="sm"
          class="send-btn gray"
          @click="setAssessStatus(2)"
          :disabled="disabled"
        >
          <b-icon icon="x" class="b-icon" aria-hidden="true"></b-icon>
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
  color: white;
  display: flex;
  box-shadow: 0px 5px #666;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: margin-top 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.send-btn.green {
  background: #17a2b8;
  border: solid 1px #17a2b8;
}

.send-btn.white {
  background: white;
  border: solid 1px #666;
  color: #222;
}

.send-btn.gray {
  border: solid 1px #484747;
  background: #484747
}

.send-btn:hover {
  opacity: 0.6;
  height: 65px;
  box-shadow: none;
  margin-top: 10px;
  top: -5px;
}

.b-icon {
  width: 30px;
  height: 30px;
}

.b-icon-sm {
  width: 18px;
  height: 18px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.disabled {
  pointer-events: none;
}
</style>
