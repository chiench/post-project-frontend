<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goEdit(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-pencil </v-icon> Cập
                nhật</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="deleteItem(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-delete </v-icon>
                Xóa bài viết</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <EditPost
      @onDone="getListPost"
      ref="editPost"
      title="Cập nhật bài viết"
      max-width="500px"
    />
  </div>
</template>

<script>
import axiosInstance from "@/plugins/axios";
import EditPost from "./edit-post.vue";
export default {
  name: "PostTable",
  components: {
    EditPost,
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Tiêu đề",
        align: "start",
        sortable: false,
        value: "title",
      },
      {
        text: "Nội dung",
        align: "start",
        sortable: false,
        value: "content",
      },
      {
        text: "Hành động",
        align: "start",
        sortable: false,
        value: "action",
      },
    ],
    items: [],
    loading: false,
  }),
  methods: {
    async getListPost() {
      this.loading = true;
      try {
        const res = await axiosInstance.get("/post");
        this.items = res.data.data;
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    goEdit(item) {
      this.$refs.editPost.openEditDialog(item);
    },
    deleteItem(item) {
      this.$confirm("Bạn có chắc chắn muốn xóa bài viết").then(async () => {
        const res = await axiosInstance.delete(`/post/${item.id}`);
        if (res.status == 200) {
          this.$toasted.success("Xóa thành công");
          this.getListPost();
        }
      });
    },
  },
  created() {
    this.getListPost();
  },
};
</script>
<style scoped></style>
