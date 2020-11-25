<template>
  <div v-if="showImageSlide" class="dialog">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      :no-hover-pause='false'
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
    >
    <div v-for="(img) in images"
      :key="img">
      <b-carousel-slide :img-src="img" style="width: 800px; height: 800px;"></b-carousel-slide>
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
});
</script>
<style>
 .dialog {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-100%,-50%);
     border: solid 1px #ccc;
     background: #ccc;
 }

 .carousel-control-prev-icon, .carousel-control-next-icon {
   color: white;
   width: 50px;
   height: 50px;
 }
</style>
