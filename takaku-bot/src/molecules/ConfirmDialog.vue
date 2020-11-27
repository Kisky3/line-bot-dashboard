<template>
  <div>
    <b-button id="show-btn" @click="showModal">Open Modal</b-button>
    <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

    <b-modal ref="my-modal" class="alert" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmDialog",
  props: ["message", "images"],
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
  }
});
</script>
<style>
.image {
  width: 80px;
  height: 80px;
  margin: 0 15px;
  object-fit: cover;
  box-shadow: 1px 1px 5px #999;
  cursor: pointer;
}

.image:hover {
  border: solid 1px gainsboro;
  opacity: 0.8;
}

.image-content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.ex-icon {
  color: #999;
  margin: 0 -5px 0 5px;
}
</style>
