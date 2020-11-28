<template>
  <header class="header" v-if="showHeader">
    <div class="c-logo-container">
      <a href="./">
        <img
          src="../assets/bot.png"
          class="c-logo-takaku"
          alt="高く売れるドットコムロゴ"
        />
        <h1>TAKAKU BOT DASHBOARD</h1>
      </a>
    </div>
  </header>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Header",
  data() {
    return {
      i: 0,
      showHeader: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scroll < 0.5) {
        this.showHeader = true;
      } else {
        this.showHeader = false;
      }
    }
  }
});
</script>
<style>
h1 {
  font-family: "Franklin Gothic Medium";
  margin-left: 20px;
  color: rgb(220, 220, 220);
  text-decoration: none;
}
.header {
  position: fixed;
  padding-top: 10px;
  background: rgb(220, 220, 220, 0.1);
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(220, 220, 220, 0.1);
  display: flex;
  justify-items: center;
  align-items: center;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}
header span {
  color: #fa9826;
  font-weight: bold;
  float: left;
  margin-left: 10px;
}

.c-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.c-logo-container {
  width: 100%;
}

.c-logo-container a {
  display: flex;
  margin-left: 30px;
  justify-content: start;
  align-items: center;
  flex-direction: row;
}

.c-logo-container a:hover {
  text-decoration: none;
}

.c-logo-takaku {
  height: 60px;
}

.c-logo-cross {
  height: 23px;
  margin: 0 5px;
}

.c-logo-oikura {
  height: 25px;
}
</style>
