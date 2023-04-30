<template>
  <div class="view-home d-flex flex-column align-center mx-auto my-4">
    <h3 class="mb-3 font-weight-normal">Post Page</h3>
    <PostTable />
  </div>
</template>

<script>
import PostTable from "../components/post-table";

export default {
  name: "HomeView",

  components: {
    PostTable,
  },
};
</script>

<style scoped></style>
