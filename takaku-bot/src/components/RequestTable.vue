<template>
  <div class="table-container">
    <h3>LINE依頼一覧</h3>
    <vue-good-table
      :columns="columns"
      :rows="todos"
      :fixed-header="true"
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
        mode: 'pages',
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
      <div slot="emptystate">データは存在しません</div>
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'Images'" class="image-container">
          <image-container :props="props" @largeImage="largeImage" />
          <assess-btns :id="props.row.id" @showAlert="openAlert" :disabled="props.row.Status !== 0"/>
        </div>

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
            <b-icon
              icon="patch-check-fll"
              variant="info"
              class="space"
            ></b-icon>
            返信済み
          </div>
        </div>
        <div v-else>{{ props.formattedRow[props.column.field] }}</div>
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
      <div class="mask" v-if="showAlert" @click="closeAlert"></div>
      <b-alert :show="showAlert" class="alert" variant="danger">
        <b-icon
        icon="x-square-fill"
        variant="danger"
        class="close-btn"
        @click="closeAlert"
      ></b-icon>
        <h4 class="alert-heading">エラーが発生しました。</h4>
        <hr />
        <p class="mb-3">
          この依頼は全て誰か返信してしまいましたため、再返信はできません。
        </p>
        <p class="mb-3">画面をリロードして、未返信の依頼を対応してください。</p>
      </b-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueGoodTable } from "vue-good-table";
import AssessBtns from "../molecules/AssessBtns.vue";
import ImageContainer from "../molecules/ImageContainer.vue";
import ImagesSlide from "../components/ImagesSlide.vue";

export default Vue.extend({
  name: "RequestTable",
  components: {
    VueGoodTable,
    AssessBtns,
    ImageContainer,
    ImagesSlide
  },
  props: ["todos"],
  data() {
    return {
      showImageSlide: false,
      num: 0,
      props: null,
      showAlert: false,
      columns: [
        {
          label: "LineID",
          field: "id",
          type: "string",
          width: "180px"
        },
        {
          label: "ユーザー名",
          field: "LineUserName",
          type: "string",
          width: "180px"
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
          width: "180px"
        }
      ]
    };
  },
  async created() {
    this.getTodos();
  },
  methods: {
    openAlert(){
      this.showAlert = true
    },
    closeAlert() {
      this.showAlert = false
      // 画面リロードする
      this.$router.go(0);
    },
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
  }
});
</script>
<style>
.mask {
  background-color:none;
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
.alert {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: solid 1px #ccc;
  z-index: 1000;
}
.table-container {
  color: #606266;
  margin: 30px;
  min-height: 700px;
}
.image-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  border: dotted 3px gainsboro;
}
.status-label {
  width: 80px;
  height: 30px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  white-space: nowrap;
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
}

.vgt-table {
  background: black;
}
</style>
