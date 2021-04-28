<template>
  <div>
    <div class="image-content">
      <img
        v-for="(imageUrl, index) in imageList"
        :key="index"
        :src="imageUrl"
        class="image"
        @click="largeImage(index, props)"
        v-b-tooltip.hover
        title="クリックして画像を拡大する"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageContainer",
  props: ["props"],
  data() {
    const images = this.props.row.Images;
     // TODO: serveに上げた後下記に変更する
     // images[i] = "../assets/noimage.png";
    if (images.length === 0) {
      images[0] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
      images[1] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
      images[2] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
    }

    if (images.length === 1) {
      images[1] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
      images[2] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
    }

    if (images.length === 2) {
      images[2] = "https://kameyama-grp.co.jp/kss-ss/wp-content/uploads/2020/01/l_e_others_500.png";
    }

    return {
      imageList: images
    };
  },
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
  margin: 0 -5px 0 5px;
}
</style>
