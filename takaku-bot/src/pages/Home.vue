<template>
  <div>
    <div class="top-container">
      <tab-filter-container
        :allNumber="allNumber"
        :replied="replied"
        :unreplied="unreplied"
        @tabFilter="tabFilter"
      />
      <logout />
    </div>
    <request-table @getRequests="getRequests" :requests="requests" />
    <loading :showLoading="showLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RequestTable from "../components/RequestTable.vue";
import { API } from "aws-amplify";
import { listLineBotRequests } from "../graphql/queries";
import TabFilterContainer from "../components/TabFilterContainer.vue";
import Loading from "../components/Loading.vue";
import Logout from "../components/Logout.vue";
export default Vue.extend({
  name: "Home",
  components: {
    RequestTable,
    TabFilterContainer,
    Loading,
    Logout
  },
  data() {
    return {
      requests: [],
      allNumber: 0,
      replied: 0,
      unreplied: 0,
      showLoading: false
    };
  },
  methods: {
    async getRequests() {
      this.showLoading = true;
      const requests = await API.graphql({
        query: listLineBotRequests
      });
      // eslint-disable-next-line
      const dataList = requests.data;
      this.requests = dataList.listLineBotRequests.items;
      this.caculateRequestNumbers(this.requests);
      this.showLoading = false;
    },
    async tabFilter(status){
      this.showLoading = true;
      //すべて
      if(status === undefined) {
        this.getRequests();
        return
      }
      //すべて以外の場合はfilterでstatusを設定して取得する
      let filter = {}

      if (status === 0) {
        filter = {
          Status: {
            eq: 0
          }
        }
      } else {
        filter = {
          Status: {
            ne: 0
          }
        }
      }

      const requests =await API.graphql({
        query: listLineBotRequests,
        variables: { filter }
      });
      const dataList = requests.data;
      this.requests = dataList.listLineBotRequests.items;
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
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: auto;
  background: #343a40;
  height: 35px;
  width: 960px;
  border-bottom: solid 1px #dcdfe6;
  margin: auto;
}
</style>
