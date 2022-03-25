<template>
  <GridLoader :loading="loading" :color="'#1f1f1f'" />
</template>

<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";
export default {
  name: "Loader",
  components: {
    GridLoader,
  },
  props: {
    loading: "",
    color: "",
  },
};
</script>

<style></style>
