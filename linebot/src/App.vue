<template>
  <div id="app">
    <h1>Line Bot Dashboard</h1>
    <div class="blue">
      <input
        v-model="LineID"
        type="text"
        placeholder="LineID"
        class="tl-price-input"
      >
      <input
        v-model="LineUserName"
        type="text"
        placeholder="ユーザー名"
        class="tl-price-input"
      >
      <input
        v-model="Images"
        type="text"
        placeholder="画像リスト"
        class="tl-price-input"
      >
      <input
        v-model="Status"
        type="text"
        placeholder="ステータス"
        class="tl-price-input"
      >
      <button
        class="btn btn-primary"
        @click="createLineRequests"
      >
        テスト依頼を作成
      </button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="todos"
      :row-style-class="rowStyleClassFn"
      :fixed-header="true"
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
        mode: 'records',
        perPage: 5,
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
    />
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createLineBotRequests } from './graphql/mutations'
import { listLineBotRequestss } from './graphql/queries'
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'App',
  components:{
    VueGoodTable
  },
  data() {
    return {
      LineID: '',
      LineUserName: '',
      Images: [],
      Status: null,
      todos: [],
      columns: [
        {
          label: 'LineID',
          field: 'LineID',
          type: 'number'
        },
        {
          label: 'ユーザー名',
          field: 'LineUserName',
          type: 'string'
        },
        {
          label: '画像',
          field: 'Images',
          type: 'array'
        },
        {
          label: 'ステータス',
          field: 'Status',
          type: 'number'
        },
      ],
    }
  },
  async created() {
    this.getTodos()
  },
  methods: {
    async createLineRequests() {
      const { LineID, LineUserName, Images, Status } = this
      if (!LineID || !LineUserName) return
      const todo = { LineID, LineUserName, Images, Status}
      this.todos = [...this.todos, todo]
      await API.graphql({
        query: createLineBotRequests,
        variables: {input: todo},
      })
      this.LineID = ''
      this.LineUserName = ''
      this.Images = ''
      this.Status = ''
    },
    rowStyleClassFn(row) {
    return row.Status === 0 ? 'pink' : '';
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listLineBotRequestss
      })
      const dataList = todos.data
      this.todos = dataList.listLineBotRequestss.items
    }
  }
}
</script>
<style>
  .pink {
    background: rgba(202, 127, 141, 0.1);
  }

  .blue {
     width: 100%;
     background: rgba(150,170,194, 0.2);
     padding: 20px 15px 30px 10px;
     text-align: center;
     display: flex;
     justify-content: space-evenly;
     align-items: center;
  }

  /*价格搜索input框*/
input, button {
            border: none;
            outline: none;
        }
.tl-price-input{
    width: auto;
    border: 1px solid #ccc;
    padding: 7px 0;
    background: #F4F4F7;
    border-radius: 3px;
    padding-left:5px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}
.tl-price-input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.ant-btn {
    line-height: 1.499;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.015);
    box-shadow: 0 2px 0 rgba(0,0,0,0.015);
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0,0,0,0.65);
    background-color: #fff;
    border-color: #d9d9d9;
}

.ant-btn-primary {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
}
.ant-btn-red {
    color: #fff;
    background-color: #FF5A44;
    border-color: #FF5A44;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
}
</style>>