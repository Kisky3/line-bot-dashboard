<template>
  <div id="app">
    <h1>Line Bot Dashboard</h1>
    <input type="text" v-model="LineID" placeholder="LineID">
    <input type="text" v-model="LineUserName" placeholder="LineUserName">
    <input type="text" v-model="Images" placeholder="Images">
    <input type="text" v-model="Status" placeholder="Status">
    <button v-on:click="createLineRequests">Create Line Requests</button>
    <div v-for="item in todos" :key="item.LineID">
      <p>LineID: {{ item.LineID }}   ユーザー名:{{ item.LineUserName }}    画像：{{ item.Images }}  ステータス：{{ item.Status }}</p>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createLineBotRequests } from './graphql/mutations';
import { listLineBotRequestss } from './graphql/queries';

export default {
  name: 'App',
  async created() {
    this.getTodos();
  },
  data() {
    return {
      LineID: '',
      LineUserName: '',
      Images: [],
      Status: 0,
      todos: []
    }
  },
  methods: {
    async createLineRequests() {
      const { LineID, LineUserName,Images,Status } = this;
      if (!LineID || !LineUserName) return;
      const todo = { LineID, LineUserName, Images, Status};
      this.todos = [...this.todos, todo];
      await API.graphql({
        query: createLineBotRequests,
        variables: {input: todo},
      });
      this.LineID = '';
      this.LineUserName = '';
      this.Images = '';
      this.Status = '';
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listLineBotRequestss
      });
      const dataList = todos.data
      this.todos = dataList.listLineBotRequestss.items
    }
  }
}
</script>