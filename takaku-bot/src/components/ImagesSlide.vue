<template>
  <div>
    <div class="mask" v-if="showImageSlide" @click="controlSlide"></div>
    <div v-if="showImageSlide" class="dialog">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        :no-hover-pause="false"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <div v-for="img in images" :key="img">
          <b-carousel-slide
            :img-src="img"
            style="width: 600px; height: 600px; object-fit: cover;"
          ></b-carousel-slide>
        </div>
      </b-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImagesSlide",
  props: ["showImageSlide", "id", "num", "images"],
  data() {
    return {
      slide: this.num,
      sliding: null
    };
  },
  methods: {
    controlSlide() {
      this.$emit("controlSlide");
    }
  }
});
</script>
<style>
.mask {
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px #ccc;
  background: #ccc;
  z-index: 1041;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 50px;
  height: 50px;
}

.close-btn {
  color: gray;
  font-size: 40px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1001;
}
</style>
