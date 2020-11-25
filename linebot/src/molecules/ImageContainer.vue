<template>
  <div>
    <div class="image-content">
      <b-icon icon="zoom-in" class="space ex-icon"></b-icon>
      <img
        v-for="(imageUrl, index) in props.row.Images"
        :key="index"
        :src="imageUrl"
        class="image"
        @click="largeImage(index, props)"
        v-b-tooltip.hover
        title="クリックしてこの画像を拡大"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageContainer",
  props: ["props"],
  methods: {
    largeImage(index, props) {
      this.$emit("largeImage", index, props);
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
  margin:0 -5px 0 5px;
}
</style>
