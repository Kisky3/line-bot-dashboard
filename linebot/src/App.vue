<template>
  <div id="app">
    <h1>Line Bot Dashboard</h1>
    <input
      v-model="LineID"
      type="text"
      placeholder="LineID">
    <input
      v-model="LineUserName"
      type="text"
      placeholder="LineUserName">
    <input
      v-model="Images"
      type="text"
      placeholder="Images">
    <input
      v-model="Status"
      type="text"
      placeholder="Status">
    <button @click="createLineRequests">
      Create Line Requests
    </button>
    <div
      v-for="item in todos"
      :key="item.LineID">
      <p>LineID: {{ item.LineID }}   ユーザー名:{{ item.LineUserName }}    画像：{{ item.Images }}  ステータス：{{ item.Status }}</p>
      <button class="btn btn-primary">
        test
      </button>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createLineBotRequests } from './graphql/mutations'
import { listLineBotRequestss } from './graphql/queries'

export default {
  name: 'App',
  data() {
    return {
      LineID: '',
      LineUserName: '',
      Images: [],
      Status: 0,
      todos: [],
      columns: [
        {
          label: 'id',
          field: 'id',
          type: 'number',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343 },
        { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ]
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