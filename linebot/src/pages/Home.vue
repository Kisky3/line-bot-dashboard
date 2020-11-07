<template>
  <div>
    <h1>Line Bot Dashboard</h1>
    <request-input @request="createLineRequests" />
    <request-table @gettodos="getTodos" :todos="todos"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RequestTable from '../components/RequestTable.vue'
import RequestInput from '../components/RequestInput.vue'
import { API } from 'aws-amplify'
import { createLineBotRequests } from '../graphql/mutations'
import { listLineBotRequestss } from '../graphql/queries'

export default Vue.extend({
  name: 'Home',
  components: {
    RequestTable,
    RequestInput
  },
  data(){
    return {
     todos: []
    }
  },
  methods: {
    async getTodos() {
      const todos = await API.graphql({
        query: listLineBotRequestss
      })
      const dataList = todos.data
      this.todos = dataList.listLineBotRequestss.items
    },
      async createLineRequests(ev) {
        const { LineID, LineUserName, Images, Status } = ev
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
}
})
</script>
