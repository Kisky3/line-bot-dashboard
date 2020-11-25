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
        placeholder: 'キーワードを入力してデーターを検索する',
      }"
      :sort-options="{
        enabled: false,
        initialSortBy: {field: 'Status', type: 'asc'}
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 15,
        position: 'top',
        perPageDropdown: [3, 5, 7],
        dropdownAllowAll: true,
        setCurrentPage: 1,
        nextLabel: '次のページへ',
        prevLabel: '前のページへ',
        rowsPerPageLabel: '表示される依頼件数を変更',
        ofLabel: '/',
        pageLabel: 'page',
        allLabel: '全て',
      }"
      compact-mode
    >
      <div slot="emptystate">
        データは存在しません
      </div>
      <template
        slot="table-row"
        slot-scope="props"
      >
        <div
          v-if="props.column.field == 'Images'"
          class="image-container"
        >
          <image-container :props="props" />
          <assess-btns :sendstatus="sendAssessStatus(props.row.id)" />
        </div>

        <div
          v-else-if="props.column.field == 'Status'"
        >
          <div class="status-label red" v-if="props.row.Status === 0"> 未返信 </div>
          <div class="status-label green" v-else> 返信済み </div>
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VueGoodTable } from 'vue-good-table';
import AssessBtns from '../molecules/AssessBtns.vue';
import ImageContainer from '../molecules/ImageContainer.vue';

export default Vue.extend({
  name: 'RequestTable',
  components: {
    VueGoodTable,
    AssessBtns,
    ImageContainer
  },
  props: ['todos'],
  data() {
    return {
    columns: [
        {
          label: 'LineID',
          field: 'id',
          type: 'string',
          width: '120px'
        },
        {
          label: 'ユーザー名',
          field: 'LineUserName',
          type: 'string',
          width: '120px'
        },
        {
          label: '画像',
          field: 'Images',
          type: 'array',
          width: '580px'
        },
        {
          label: 'ステータス',
          field: 'Status',
          type: 'number',
          width: '120px'
        },
      ],
    }
  },
  async created() {
    this.getTodos()
  },
  methods: {
    rowStyleClassFn(row) {
      return row.Status === 0 ? 'pink' : '';
    },
    getTodos(){
       this.$emit('gettodos');
    },
    sendAssessStatus:(id) => (status) => {
      // eslint-disable-next-line
      console.log("hh");
      // eslint-disable-next-line
      console.log(id, status)
    }
  }
})
</script>
<style>
.pink {
  background: rgba(200,20,62,0.1);
}
  .table-container {
    margin: 30px;
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
  background: Crimson;
}

.status-label.green {
  background: cadetblue;
}

.vgt-table {
  background: black;
}
</style>
