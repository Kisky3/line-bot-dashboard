<template>
  <div>
    {{ props.column.field }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageContainer",
  props:['props'],
  methods: {
  }
});
</script>
<style>

</style>
