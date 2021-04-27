<template>
  <div class="table-container">
    <vue-good-table
      :columns="columns"
      :rows="requests"
      styleClass="vgt-table bordered"
      :row-style-class="rowStyleClassFn"
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
        <!--登録日時-->
        <div v-if="props.column.field == 'createdAt'">
          {{ editDate(props.row.createdAt) }}
        </div>
        <!--画像 / 査定-->
        <div v-else-if="props.column.field == 'Images'" class="image-container">
          <image-container :props="props" @largeImage="largeImage" />
          <assess-btns
            :id="props.row.id"
            @setAssessStatus="setAssessStatus"
            :status="props.row.Status"
            :props="props"
          />
        </div>
        <!--ステータス-->
        <div v-else-if="props.column.field == 'Status'">
          <div class="status-label" v-if="props.row.Status === 0">
            未返信
          </div>
          <div class="status-label green" v-else>
            返信済
          </div>
            <span class="status-label-reply" v-if="props.row.Status === 1">{{editDate(props.row.repliedAt) + props.row.UserName + "さんは「買取不明」を返信しました。"}}</span>
            <span class="status-label-reply" v-if="props.row.Status === 2">{{editDate(props.row.repliedAt) + props.row.UserName + "さんは「買取不可」を返信しました。"}}</span>
            <span class="status-label-reply" v-if="props.row.Status === 3">{{editDate(props.row.repliedAt) + props.row.UserName + "さんは「買取可能」を返信しました。"}}</span>
        </div>
        <div v-else>{{ props.formattedRow[props.column.field] }}</div>
      </template>
      <!-- カラムHeaderの表示設定 -->
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label == 'LineID'">
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == 'ユーザー名'">
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == '画像 / 査定'">
          {{ props.column.label }}
        </span>
        <span v-else>
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
  props: ["requests"],
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
          label: "登録日時",
          field: "createdAt",
          type: "string",
          width: "130px"
        },
        {
          label: "ステータス",
          field: "Status",
          type: "number",
          width: "350px"
        },
        {
          label: "ユーザー名",
          field: "LineUserName",
          type: "string",
          width: "130px"
        },
        {
          label: "画像",
          field: "Images",
          type: "array",
          width: "250px"
        }
      ]
    };
  },
  async created() {
    this.getRequests();
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
    editDate(propDate) {
      const date = propDate.split("T")[0].split("-").join("/");
      const time = propDate.split("T")[1].substr(0, 5);
      const currentData = `${date}\xa0\xa0${time}\xa0\xa0` ;
      return currentData
    },
    rowStyleClassFn(row) {
      return row.Status !== 0 ? "info" : "";
    },
    getRequests() {
      this.$emit("getRequests");
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
          assessStatus = "買取可能";
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
  min-height: 700px;
  min-width: 1000px;
}
.image-container {
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  border-radius: 5px;
}
.status-label {
  width: 180px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #222;
}

.status-label.green {
  font-size: 14px;
  font-weight: bold;
  color: #17a2b8;
  background: none;
}

.vgt-right-align {
  text-align: left;
}

.status-label-reply {
  font-size: 13px;
  color: #17a2b8!important;
  font-weight: normal;
}

.vgt-table {
  background: black;
  font-size: 13px!important;
}

.vgt-table th {
  padding: 0 0 0 14px!important;
  background: #17a2b8!important;
  border-top: solid 2px #17a2b8!important;
  border-left: solid 1px #17a2b8!important;
  color: white!important;
  font-size: 13px;
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

table.vgt-left-align {
  height: 30px;
  background: red;
}

.green {
  white-space: nowrap;
  padding-top:0;
}

.image-container {
  flex-direction: column;
}
}
</style>
