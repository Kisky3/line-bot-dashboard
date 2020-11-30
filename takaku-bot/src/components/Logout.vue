<template>
  <div class="number-block-container">
    <div class="number-block-title">
      <b-icon
        icon="emoji-sunglasses"
        ont-scale="15"
        class="smile-icon"
      ></b-icon>
      ようこそ！ {{ username }} 様
    </div>
    <b-button variant="outline-info" class="mb-2" @click="onSignOutClick">
      <b-icon icon="power" aria-hidden="true"></b-icon>
      Logout
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Auth } from "aws-amplify";

export default Vue.extend({
  name: "Logout",
  data() {
    return {
      username: ""
    };
  },
  async mounted() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    const cognitoUser = await Auth.currentAuthenticatedUser();
    this.username = cognitoUser.username;
  },
  methods: {
    async onSignOutClick() {
      await Auth.signOut();
    }
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
  color: #17a2b8;
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
  white-space: nowrap;
}

.smile-icon {
  font-size: 20px;
  margin-right: 10px;
}

.btn:hover {
  opacity: 1;
}
</style>
