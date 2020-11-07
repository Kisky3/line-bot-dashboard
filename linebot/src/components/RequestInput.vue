<template>
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
</template>

<script>
export default {
    name: 'RequestInput',
    props: ['onCreated'],
    data() {
        return {
        LineID: '',
        LineUserName: '',
        Images: [],
        Status: '',
        }
      },
    methods: {
    createLineRequests() {
        const { LineID, LineUserName, Images, Status } = this;
        if (!LineID || !LineUserName) return
        this.$emit('request', {
            LineID, LineUserName, Images, Status
        });
        // how to wait for submit success?
        this.LineID = '';
        this.LineUserName = '';
        this.Images = [];
        this.Status = '';

    },

    }

}
</script>

<style scoped>
  .blue {
     background: rgba(150,170,194, 0.2);
     padding: 20px 15px 30px 10px;
  }
.tl-price-input{
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


</style>