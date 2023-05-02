<template>
  <div class="view-home d-flex flex-column align-center mx-auto my-4">
    <div class="header">
      <h3 class="mb-3 font-weight-normal">Post Page</h3>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            @click="showFormAdd"
            v-bind="attrs"
            v-on="on"
          >
            Thêm mới
          </v-btn>
        </template>
        <span>Thêm mới</span>
      </v-tooltip>
    </div>
    <CreatePost
      @onDone="onDoneCreate"
      title="Thêm mới bài viết"
      max-width="500px"
      ref="addPost"
    />
    <PostTable ref="postTable" />
  </div>
</template>

<script>
import PostTable from "../components/post-table";
import CreatePost from "../components/create-post";

export default {
  name: "HomeView",

  components: {
    PostTable,
    CreatePost,
  },
  methods: {
    showFormAdd() {
      this.$refs.addPost.openDialog();
    },
    onDoneCreate() {
      this.$refs.postTable.getListPost();
    },
  },
};
</script>

<style scoped></style>
