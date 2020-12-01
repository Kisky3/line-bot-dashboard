<template>
  <div class="table-container">
    <h5>依頼一覧</h5>
    <vue-good-table
      :columns="columns"
      :rows="todos"
      styleClass="vgt-table"
      :row-style-class="rowStyleClassFn"
      :search-options="{
        enabled: true,
        placeholder: 'キーワードを入力してデーターを検索する'
      }"
      :sort-options="{
        enabled: false,
        initialSortBy: { field: 'Status', type: 'asc' }
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 7,
        position: 'bottom',
        perPageDropdown: [3, 5, 7],
        dropdownAllowAll: true,
        setCurrentPage: 1,
        nextLabel: '次のページへ',
        prevLabel: '前のページへ',
        rowsPerPageLabel: '表示される依頼件数を変更',
        ofLabel: '/',
        pageLabel: 'page',
        allLabel: '全て'
      }"
      compact-mode
    >
      <!--データ存在しない場合の表示-->
      <div slot="emptystate">データは存在しません</div>
      <template slot="table-row" slot-scope="props">
        <!--画像 / 査定-->
        <div v-if="props.column.field == 'Images'" class="image-container">
          <image-container :props="props" @largeImage="largeImage" />
          <assess-btns
            :id="props.row.id"
            @setAssessStatus="setAssessStatus"
            :disabled="props.row.Status !== 0"
            :props="props"
          />
        </div>
        <!--ステータス-->
        <div v-else-if="props.column.field == 'Status'">
          <div class="status-label red" v-if="props.row.Status === 0">
            <b-icon
              icon="exclamation-circle-fill"
              variant="danger"
              class="space"
            ></b-icon
            >未返信
          </div>
          <div class="status-label green" v-else>
            <div>
              <b-icon icon="patch-check-fll" variant="info" class="space"></b-icon
            >返信済み
            </div>
            <span v-if="props.row.Status === 1">{{props.row.UserName + "さんは「買取不明」を返信しました"}}</span>
            <span v-if="props.row.Status === 2">{{props.row.UserName + "さんは「買取不可」を返信しました"}}</span>
            <span v-if="props.row.Status === 3">{{props.row.UserName + "さんは「高くフォームを送信」を返信しました"}}</span>
            <span v-if="props.row.Status === 4">{{props.row.UserName + "さんは「おいくらフォームを送信」を返信しました"}}</span>
          </div>
        </div>
        <div v-else>{{ props.formattedRow[props.column.field] }}</div>
      </template>
      <!-- カラムHeaderの表示設定 -->
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label == 'LineID'">
          <b-icon icon="file-text" class="space"></b-icon>
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == 'ユーザー名'">
          <b-icon icon="person"></b-icon>
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == '画像 / 査定'">
          <b-icon icon="file-image" class="space"></b-icon>
          {{ props.column.label }}
        </span>
        <span v-else>
          <b-icon icon="grid1x2" class="space"></b-icon>
          {{ props.column.label }}
        </span>
      </template>
    </vue-good-table>
    <!--画像のスライド-->
    <images-slide
      @controlSlide="closeImageSlide"
      v-if="props && showImageSlide"
      :showImageSlide="showImageSlide"
      :id="props.row.LineID"
      :num="num"
      :images="props.row.Images"
    />
    <!--送信前のステータスチェックアラート-->
    <confirm-dialog
      ref="controlDialog"
      :type="dialogType"
      :title="dialogTitle"
      :content="dialogContent"
      @sendMessage="sendMessage"
    >
      <image-container :props="props" @largeImage="largeImage" />
    </confirm-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueGoodTable } from "vue-good-table";
import AssessBtns from "../molecules/AssessBtns.vue";
import ImageContainer from "../molecules/ImageContainer.vue";
import ImagesSlide from "../components/ImagesSlide.vue";
import ConfirmDialog from "../molecules/ConfirmDialog.vue";
import { updateLineBotRequest } from "../graphql/mutations";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getLineBotRequest } from "../graphql/queries";

export default Vue.extend({
  name: "RequestTable",
  components: {
    VueGoodTable,
    AssessBtns,
    ImageContainer,
    ImagesSlide,
    ConfirmDialog
  },
  props: ["todos"],
  data() {
    return {
      id: null,
      status: "",
      showImageSlide: false,
      num: 0,
      props: null,
      showAlert: false,
      dialogType: "alert",
      dialogContent: null,
      dialogMessage: "",
      dialogTitle: "",
      columns: [
        {
          label: "LineID",
          field: "id",
          type: "string",
          width: "130px"
        },
        {
          label: "ユーザー",
          field: "LineUserName",
          type: "string",
          width: "130px"
        },
        {
          label: "画像 / 査定",
          field: "Images",
          type: "array",
          width: "380px"
        },
        {
          label: "ステータス",
          field: "Status",
          type: "number",
          width: "130px"
        }
      ]
    };
  },
  async created() {
    this.getTodos();
  },
  methods: {
    closeImageSlide() {
      this.showImageSlide = false;
    },
    largeImage(num, props) {
      this.props = props;
      this.num = num;
      this.showImageSlide = true;
    },
    rowStyleClassFn(row) {
      return row.Status === 0 ? "info" : "";
    },
    getTodos() {
      this.$emit("gettodos");
    },
    async setAssessStatus(id, status, props) {
      // props中の画像内容をconfirm dialogに渡す
      this.id = id;
      this.props = props;
      this.status = status;

      const result = await API.graphql(
        graphqlOperation(getLineBotRequest, { id })
      );

      // 返信済みの場合はアラートを出して、画面をリロードする
      if (result && result.data.getLineBotRequest.Status !== 0) {
        this.dialogType = "alert";
        this.dialogTitle = "エラーが発生しました。";
        this.dialogContent =
          "この依頼は誰か返信してしまいました、再返信はできません。未返信の依頼を対応してください。";
        this.$refs.controlDialog.showModal();
        return;
      }

      let assessStatus = "";
      switch (status) {
        case 1:
          assessStatus = "買取不明";
          break;
        case 2:
          assessStatus = "買取不可";
          break;
        case 3:
          assessStatus = "高くフォームを送信";
          break;
        case 4:
          assessStatus = "おいくらフォームを送信";
          break;
      }

      const content = `${this.props.row.LineUserName}様から頂いた写真の査定結果は「${assessStatus}」。`;

      // 未返信の場合は確認ダイアログを表示する
      this.dialogType = "confirm";
      this.dialogTitle = "下記の内容で送信しますか";
      this.dialogContent = content;
      this.$refs.controlDialog.showModal();
    },
    async sendMessage() {
      //TODO:Connect Lambda passing id and status
      const sendStatus = true;
      try {
        //Statusと操作ユーザー情報を更新する
        if (sendStatus) {
          this.updateStatusAndUser(this.id, this.status).then(() => {
            // 画面リロードする
            this.$router.go(0);
          });
        }
      } catch (e) {
        alert(e.error);
      }
    },
    async updateStatusAndUser(id, status) {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const email = cognitoUser.attributes.email;
      const name = cognitoUser.username;
      const input = { id, Status: status, UserID: email, UserName: name };
      return await API.graphql(
        graphqlOperation(updateLineBotRequest, {
          input
        })
      );
    }
  }
});
</script>
<style>
.mask {
  background-color: none;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.info {
  background: #dcdcdc4f;
}
.table-container {
  color: #606266;
  margin: 30px;
  min-height: 700px;
  min-width: 1200px;
}
.image-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  border: dotted 3px gainsboro;
}
.status-label {
  width: 180px;
  height: 30px;
  color: white;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: auto;
}
.status-label.red {
  font-size: 18px;
  font-weight: bold;
  color: #dc3545;
  background: none;
}

.status-label.green {
  font-size: 18px;
  font-weight: bold;
  color: #17a2b8;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  max-width: 180px;
}

.green > span {
  font-size: 16px;
  color: black;
  font-weight: normal;
  text-align: start;
  word-wrap:break-word!important;
  word-break : break-all!important;
}

.vgt-table {
  background: black;
}

@media (max-width: 576px) {
table.vgt-table td {
  padding: .75em .75em .75em .75em;
    vertical-align: top;
    border-bottom: 1px solid #dcdfe6;
    color: #606266;
    display: flex;
    justify-content: start;
    align-items: center;
}
.green {
  white-space: nowrap;
  padding-top:0;
}
}
</style>
