<template>
  <div>
    <div class="image-content">
      <img
        v-for="(imageUrl,index) in props.row.Images"
        :key="index"
        :src="imageUrl"
        class="image"
        @click="largeImage(index)"
      >
    </div>
    <images-slide :showImageSlide="showImageSlide" :id="props.row.LineID" :index="index" :images="props.row.Images" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ImagesSlide from '../components/ImagesSlide.vue';

export default Vue.extend({
  name: "ImageContainer",
  props: ['props'],
  data() {
    return {
      showImageSlide: false,
      index: 0
    }
  },
  components: {
    ImagesSlide
  },
  methods: {
    largeImage(index) {
      this.index = index;
      this.showImageSlide = true;
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
