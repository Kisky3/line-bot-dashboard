<template>
  <div class="tab-filter-container">
    <div class="number-block-title">
      {{ username }}さん
    </div>
    <b-button variant="outline-info" class="mb-2" @click="onSignOutClick">
      ログアウト
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
  color: white;
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
}

.mb-2 {
  font-size: 13px;
  height: 25px;
  border: 0;
  color: white;
  width: 100px;
  margin-top: 5px;
}
.mb-2:hover {
  background: none;
  color: #17a2b8;
  opacity: 1;
  font-weight: bold;
}

</style>
