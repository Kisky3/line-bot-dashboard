<template>
  <header>
    <div class="c-logo-container">
      <a href="./">
        <img
          src="../assets/bot1.png"
          class="c-logo-takaku"
          alt="高く売れるドットコムロゴ"
        />
        <h1>LINE BOT DASHBOARD</h1>
      </a>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Header'
})
</script>
<style>
  h1 {
   font-family: "Franklin Gothic Medium";
   margin-left: 20px;
   color: white;
   text-decoration: none;
  }
  header {
  position: fixed;
  padding-top: 10px;
  background: #343a40;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #f0f0f0;
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
  max-width: 1200px;
  margin:auto;
  justify-content: start;
  align-items: center;
  flex-direction: row;
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
