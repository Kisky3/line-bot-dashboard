<template>
  <div>
    <div
      class="c-btn-container"
      :class="{
        disabled: disabled
      }"
    >
      <div class="c-btn-content">
        <b-button
          size="sm"
          variant="dark"
          class="btn"
          @click="setAssessStatus(1)"
          :disabled="disabled"
        >
          買取不明
        </b-button>
        <b-button
          size="sm"
          variant="dark"
          class="btn"
          @click="setAssessStatus(2)"
          :disabled="disabled"
        >
          買取不可
        </b-button>
      </div>

      <div class="c-btn-content">
        <b-button
          size="sm"
          variant="warning"
          class="btn"
          @click="setAssessStatus(3)"
          :disabled="disabled"
        >
          高くフォームを送信
        </b-button>
        <b-button
          size="sm"
          variant="warning"
          class="btn"
          @click="setAssessStatus(4)"
          :disabled="disabled"
        >
          おいくらフォームを送信
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getLineBotRequest } from "../graphql/queries";
import { updateLineBotRequest } from "../graphql/mutations";

export default Vue.extend({
  name: "AssessBtns",
  props: ["id", "disabled"],
  methods: {
    async setAssessStatus(status) {
      const result = await API.graphql(
        graphqlOperation(getLineBotRequest, { id: this.id })
      );
      // 返信済みの場合はアラートを出して、画面をリロードする
      if (result && result.data.getLineBotRequest.Status !== 0) {
        this.$emit("showAlert");
        return;
      }
      // 未返信の場合はLambdaに送信する
      try {
        const sendStatus = this.sendMessage(this.id, status);
        //TODO: Lambda戻り値のチェック
        //Statusを更新する
        if (sendStatus) {
          this.updateStatusAndUser(this.id, status).then(() => {
            // 画面リロードする
            this.$router.go(0);
          });
        }
      } catch (e) {
        alert(e.error);
      }
    },
    async sendMessage(id, status) {
      //TODO:Connect Lambda
      // eslint-disable-next-line
      console.log(id + status);
      return;
    },
    async updateStatusAndUser(id, status) {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const email = cognitoUser.attributes.email;
      const input = { id, Status: status, UserID: email };
      return await API.graphql(
        graphqlOperation(updateLineBotRequest, {
          input
        })
      );
    }
  }
});
</script>
<style lang="scss">
.c-btn-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.c-btn-content {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.btn {
  margin: 5px 10px;
  width: 200px;
  border-radius: 15px;
}

.btn:hover {
  opacity: 0.7;
}

.disabled {
  pointer-events: none;
}
</style>
