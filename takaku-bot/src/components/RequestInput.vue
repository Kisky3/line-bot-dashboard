<template>
  <div class="blue table-container">
    <input
      v-model="LineID"
      type="text"
      placeholder="LineID"
      class="tl-price-input"
    />
    <input
      v-model="LineUserName"
      type="text"
      placeholder="ユーザー名"
      class="tl-price-input"
    />
    <input
      v-model="Images"
      type="text"
      placeholder="画像リスト"
      class="tl-price-input"
    />
    <input
      v-model="Status"
      type="text"
      placeholder="ステータス"
      class="tl-price-input"
    />
    <button class="btn btn-primary" @click="createLineRequests">
      テスト依頼を作成
    </button>
  </div>
</template>

<script>
export default {
  name: "RequestInput",
  data() {
    return {
      LineID: "",
      LineUserName: "",
      Images: [],
      Status: ""
    };
  },
  methods: {
    createLineRequests() {
      const { LineID, LineUserName, Images, Status } = this;
      if (!LineID || !LineUserName) return;
      this.$emit("request", {
        LineID,
        LineUserName,
        Images,
        Status
      });
      this.LineID = "";
      this.LineUserName = "";
      this.Images = [];
      this.Status = "";
    }
  }
};
</script>

<style scoped>
.table-container {
  margin: auto;
  width: 100%;
}

input,
button {
  border: none;
  outline: none;
}
.tl-price-input {
  border: 1px solid #ccc;
  padding: 7px 0;
  background: #f4f4f7;
  border-radius: 3px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.tl-price-input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
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
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}

.ant-btn-primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-red {
  color: #fff;
  background-color: #ff5a44;
  border-color: #ff5a44;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.blue {
  background: rgba(150, 170, 194, 0.2);
  padding: 20px 15px 30px 10px;
}
.tl-price-input {
  border: 1px solid #ccc;
  padding: 7px 0;
  background: #f4f4f7;
  border-radius: 3px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.tl-price-input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
