<template>
  <div v-if="showImageSlide">
     {{ index }}
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
    <div v-for="(img) in images"
      :key="img">
      <b-carousel-slide :img-src="img"></b-carousel-slide>
    </div>
    </b-carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImagesSlide",
  props: ["showImageSlide", "id", "index", "images"],
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  watch:{
    index(val){
      this.slide = val
    }
  },
  methods: {
  }
});
</script>
<style>
</style>
