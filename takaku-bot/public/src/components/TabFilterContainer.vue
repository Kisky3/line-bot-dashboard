<template>
  <div class="tab-filter-container">
    <tab-filter
      @tabFilter="tabFilter()"
      :active="active === undefined"
      label="すべて"
      :number="allNumber"
    />
    <tab-filter
      @tabFilter="tabFilter(0)"
      :active="active === 0"
      label="未返信"
      :number="unreplied"
    />
    <tab-filter
      @tabFilter="tabFilter(1)"
      :active="active === 1"
      label="返信済み"
      :number="replied"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabFilter from "../molecules/TabFilter.vue";

export default Vue.extend({
  name: "TabFilterContainer",
  props: ["allNumber", "replied", "unreplied"],
  data() {
    return {
      active: undefined
    };
  },
  components: {
    TabFilter
  },
  methods: {
    tabFilter(status) {
      this.active = status;
      this.$emit("tabFilter", status);
    }
  }
});
</script>
<style>
.tab-filter-container {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
