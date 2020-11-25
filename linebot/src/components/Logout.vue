<template>
  <div class='number-block-container'
  >
   <div class="number-block-title">
     <b-icon icon="person-circle"></b-icon>
     ようこそ！ {{username}} 様
   </div>
   <amplify-sign-out />
  </div>
</template>

<script>
import Vue from "vue";
import { Auth } from 'aws-amplify'

export default Vue.extend({
  name: "Logout",
  data(){
    return {
      username: ''
    }
  },
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
      const cognitoUser = await Auth.currentAuthenticatedUser()
      this.username = cognitoUser.username
  }
});
</script>
<style>
.logput-container {
 display: flex;
 justify-content: start;
 align-items: center;
 margin: auto;
 margin-top: 100px;
 max-width: 1210px;
}

.number-block-title {
  color:cadetblue;
  font-size: 16px;
  font-weight: bold;
}
</style>
