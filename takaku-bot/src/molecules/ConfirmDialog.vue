<template>
  <div class="modal-dialog">
    <b-modal ref="my-modal" class="alert" hide-footer>
      <div class="d-block text-center">
        <h3>{{ title }}</h3>
        <p class="mb-3">{{ content }}</p>
        <slot />
      </div>
      <b-button
        class="mt-2 full"
        variant="warning"
        v-if="type === 'confirm'"
        block
        @click="toggleModal"
      >送信する</b-button>
      <b-button class="mt-2 full" variant="outline-danger" block @click="hideModal">閉じる</b-button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmDialog",
  props: ["type", "content", "title"],
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      // alertの場合はページをリロードする
      if (this.type === 'alert') {
        this.$router.go(0);
      }
    },
    toggleModal() {
      this.$emit('sendMessage');
    }
  }
});
</script>
<style>
.modal-dialog {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)!important;
  z-index: 1000;
}
.full {
  width: 95%;
  margin-top: 20px!important;
}

.d-block > p {
  font-size: 20px;
}
</style>
