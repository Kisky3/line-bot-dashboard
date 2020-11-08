<template>
  <div>
    <div class="image-content">
      <img
        v-for="(imageUrl,index) in props.row.Images"
        :key="index"
        :src="imageUrl"
        class="image"
        @click="largeImage(props.row.LineID, index, props.row.Images)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageContainer",
  props: ['props'],
  methods: {
    largeImage(id, index) {
      alert(`${id}:${index}`)
    },
  }
});
</script>
<style>
.image{
  width: 80px;
  height: 80px;
  margin: 0 5px;
  box-shadow:1px 1px 5px #999;
}
.image-content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>
