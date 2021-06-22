<template>
  <header class="header">
    <div class="c-logo-container">
      <p class="title">写真で高く売れるドットコムダッシュボード</p>
    </div>
  </header>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Header",
});
</script>
<style>
.title {
  font-family: "Franklin Gothic Medium";
  color: #222;
  margin: 5px 0;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;
}
.header {
  background: #fff;
  top: 0;
  left: 0;
  width: 960px;
  margin: auto;
  height: 30px;
  border-bottom: 1px solid rgba(220, 220, 220, 0.1);
  display: flex;
  justify-items: center;
  align-items: center;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}

.-hidden {
  height: 20px;
  background: black;
  padding-top: 15px;
  border-bottom: 1px solid #f0f0f05b;
  box-shadow: 0 4px 4px rgba(0,0,0,.18);
}

.-sm {
  font-size: 13px;
}

.-disappear {
  display: none;
}

.header span {
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
  margin-left: 15px;
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