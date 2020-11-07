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

</style>
