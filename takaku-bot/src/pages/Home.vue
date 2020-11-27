<template>
  <div>
    <!-- <request-input @request="createLineRequests" /> -->
    <div class="top-container">
      <number-block-container
        :allNumber="allNumber"
        :replied="replied"
        :unreplied="unreplied"
      />
      <logout />
    </div>
    <request-table @gettodos="getTodos" :todos="todos" />
    <loading :showLoading="showLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RequestTable from "../components/RequestTable.vue";
// import RequestInput from '../components/RequestInput.vue'
import { API } from "aws-amplify";
import { createLineBotRequest } from "../graphql/mutations";
import { listLineBotRequests } from "../graphql/queries";
import NumberBlockContainer from "../components/NumberBlockContainer.vue";
import Loading from "../components/Loading.vue";
import Logout from "../components/Logout.vue";

export default Vue.extend({
  name: "Home",
  components: {
    RequestTable,
    // RequestInput,
    NumberBlockContainer,
    Loading,
    Logout
  },
  data() {
    return {
      todos: [],
      allNumber: 0,
      replied: 0,
      unreplied: 0,
      showLoading: false
    };
  },
  methods: {
    async getTodos() {
      this.showLoading = true;
      const todos = await API.graphql({
        query: listLineBotRequests
      });
      // eslint-disable-next-line
      const dataList = todos.data;
      this.todos = dataList.listLineBotRequests.items;
      this.caculateRequestNumbers(this.todos);
      this.showLoading = false;
    },
    async createLineRequests(ev) {
      this.showLoading = true;
      const { LineID, LineUserName, Images, Status } = ev;
      if (!LineID || !LineUserName) return;
      const todo = { LineID, LineUserName, Images, Status };
      this.todos = [...this.todos, todo];
      this.caculateRequestNumbers(this.todos);
      await API.graphql({
        query: createLineBotRequest,
        variables: { input: todo }
      });
      this.LineID = "";
      this.LineUserName = "";
      this.Images = "";
      this.Status = "";
      this.showLoading = false;
    },
    caculateRequestNumbers(list) {
      this.allNumber = list.length;
      this.unreplied = list.filter((list) => list.Status === 0).length;
      this.replied = this.allNumber - this.unreplied;
    }
  }
});
</script>
<style>
.blue {
  background: rgba(220, 20, 60, 0.6);
  padding: 20px 15px 30px 10px;
}
.top-container {
  display: flex;
  justify-content:space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom:  -10px;
  background: #343a40;
}
</style>
