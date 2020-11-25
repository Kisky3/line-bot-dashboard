<template>
  <div class="table-container">
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
        position: 'top',
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
          <assess-btns :sendstatus="sendAssessStatus(props.row.id)" />
        </div>

        <div v-else-if="props.column.field == 'Status'">
          <div class="status-label red" v-if="props.row.Status === 0">
            <b-icon icon="exclamation-circle-fill" variant="danger" class="space"></b-icon
            >未返信
          </div>
          <div class="status-label green" v-else>返信済み</div>
        </div>
        <div v-else>{{ props.formattedRow[props.column.field] }}</div>
      </template>
    </vue-good-table>
    <!--画像のスライド-->
    <images-slide
      v-if="props && showImageSlide"
      :showImageSlide="showImageSlide"
      :id="props.row.LineID"
      :index="num"
      :images="props.row.Images"
    />
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
      columns: [
        {
          label: "LineID",
          field: "id",
          type: "string",
          width: "150px"
        },
        {
          label: "ユーザー名",
          field: "LineUserName",
          type: "string",
          width: "150px"
        },
        {
          label: "画像",
          field: "Images",
          type: "array",
          width: "580px"
        },
        {
          label: "ステータス",
          field: "Status",
          type: "number",
          width: "150px"
        }
      ]
    };
  },
  async created() {
    this.getTodos();
  },
  watch: {
    num(val) {
      this.num = val;
    },
    props(val) {
      this.props = val;
    }
  },
  methods: {
    closeImageSlide() {
      this.showImageSlide = false;
    },
    largeImage(index, props) {
      this.props = props;
      this.num = index;
      this.showImageSlide = true;
    },
    rowStyleClassFn(row) {
      return row.Status === 0 ? "info" : "";
    },
    getTodos() {
      this.$emit("gettodos");
    },
    sendAssessStatus: (id) => (status) => {
      // eslint-disable-next-line
      console.log("hh");
      // eslint-disable-next-line
      console.log(id, status);
    }
  }
});
</script>
<style>
.info {
  background: gainsboro;
}
.table-container {
  margin: 30px;
  min-height: 700px;
}
.image-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.status-label {
  width: 80px;
  height: 30px;
  color: white;
  display: flex;
  justify-content: center;
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
}

.vgt-table {
  background: black;
}

.space {
  margin-right: 5px;
}
</style>
