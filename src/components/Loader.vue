<template>
  <PulseLoader :loading="loading" :color="'#1f1f1f'" />
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Loader",
  components: {
    PulseLoader,
  },
  props: {
    loading: "",
    color: "",
  },
};
</script>

<style></style>
