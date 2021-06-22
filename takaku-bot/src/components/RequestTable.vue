<template>
  <div class="table-container">
    <vue-good-table
      :columns="columns"
      :rows="requests"
      styleClass="vgt-table bordered"
      :row-style-class="rowStyleClassFn"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'createdAt', type: 'desc' }
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
        <div v-if="props.column.field == 'createdAt'" class="table-field">
          {{ editDate(props.row.createdAt, "createdAt") }}
        </div>
        <!--画像 / 査定-->
        <div v-else-if="props.column.field == 'Images'" class="image-container">
          <image-container
            :props="props"
            :imageLists="editImageLists(props.row.Images)"
            @largeImage="largeImage"
          />
          <assess-btns
            :id="props.row.id"
            @setAssessStatus="setAssessStatus"
            :status="props.row.Status"
            :props="props"
          />
        </div>
        <!--ステータス-->
        <div v-else-if="props.column.field == 'Status'" class="table-field-mid">
          <div class="status-label no-wrap" v-if="props.row.Status === 0">
            未返信
          </div>
          <div class="status-label green no-wrap" v-else>
            返信済
          </div>
          <span class="status-label-reply" v-if="props.row.Status === 1">{{
            editDate(props.row.repliedAt, "repliedAt") +
              props.row.UserName +
              "さんは「買取不明」を返信しました。"
          }}</span>
          <span class="status-label-reply" v-if="props.row.Status === 2">{{
            editDate(props.row.repliedAt, "repliedAt") +
              props.row.UserName +
              "さんは「買取不可」を返信しました。"
          }}</span>
          <span class="status-label-reply" v-if="props.row.Status === 3">{{
            editDate(props.row.repliedAt, "repliedAt") +
              props.row.UserName +
              "さんは「買取可能」を返信しました。"
          }}</span>
        </div>
        <div v-else class="table-field">{{ props.formattedRow[props.column.field] }}</div>
      </template>
      <!-- カラムHeaderの表示設定 -->
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label == 'LineID'" class="table-field">
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == 'ユーザー名'" class="table-field">
          {{ props.column.label }}
        </span>
        <span v-else-if="props.column.label == '画像 / 査定'">
          {{ props.column.label }}
        </span>
        <span v-else class="table-field">
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
import axios from "axios";

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
        },
        {
          label: "ステータス",
          field: "Status",
          type: "number",
        },
        {
          label: "ユーザー名",
          field: "LineUserName",
          type: "string",
        },
        {
          label: "画像",
          field: "Images",
          type: "array",
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
    editImageLists(images) {
      if (images.length === 0) {
        // TODO: configにまとめる
        images[0] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
        images[1] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
        images[2] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
      }

      if (images.length === 1) {
        images[1] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
        images[2] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
      }

      if (images.length === 2) {
        images[2] =
          "https://www.to-conne.co.jp/dcms_media/image/NoImage.jpg";
      }
      return images;
    },
    editDate(propDate, type) {
      if (propDate === null) return "";
      const date = propDate
        .split("T")[0]
        .split("-")
        .join("/");
      const time = propDate.split("T")[1].substr(0, 5);

      let currentData
      if (type === "createdAt") {
        currentData = propDate === null ? '' : `${date}\xa0\xa0\xa0\xa0\xa0\xa0${time}\xa0\xa0`;
      } else {
        currentData = propDate === null ? '' : `${date}\xa0\xa0${time}\xa0\xa0`;
      }
      return currentData;
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
      const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
      const currentDate = date.toISOString();

      // TODO: configにまとめる
      const endpoint =
        "";
      const params = {
        lineId: this.id.substr(0, this.id.length - 32),
        status: Number(this.status),
        repliedAt: currentDate
      };

      // まとめて送信と更新処理
      await Promise.all(
        [
          this.sendInfoToLambda(endpoint, params),
          this.updateStatusAndUser(this.id, this.status)
        ].filter((p) => p)
      ).then(async () => {
        // 画面リロードする
        this.$router.go(0);
      });
    },
    async sendInfoToLambda(endpoint, params) {
      axios
        .get(endpoint, { params })
        .then(function(res) {
          if (res.status === 200) {
            return true;
          } else {
            this.dialogType = "alert";
            this.dialogTitle = "エラーが発生しました。";
            this.dialogContent =
              "何らかの原因で返信失敗しました。SD部に連絡してください。";
            this.$refs.controlDialog.showModal();
          }
        })
        .catch();
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
  width: 960px !important;
  min-height: 700px;
  margin: auto;
}
.table-field {
  width: 95px !important;
  word-wrap:break-word;
}
.table-field-mid {
  width: 115px !important;
  word-wrap:break-word;
}
.no-wrap {
  white-space:nowrap;
}
.image-container {
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  border-radius: 5px;
}
.status-label {
  width: 0px;
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
  color: #17a2b8 !important;
  font-weight: normal;
}

.vgt-table {
  background: black;
  font-size: 13px !important;
}

.vgt-table th {
  padding: 0 0 0 14px !important;
  background: #17a2b8 !important;
  border-top: solid 2px #17a2b8 !important;
  border-left: solid 1px #17a2b8 !important;
  color: white !important;
  font-size: 13px;
}

@media (max-width: 576px) {
  table.vgt-table td {
    padding: 0.75em 0.75em 0.75em 0.75em;
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
    padding-top: 0;
  }

  .image-container {
    flex-direction: column;
  }
}
</style>
