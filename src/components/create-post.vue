<template>
  <v-dialog v-model="dialog" persistent :max-width="maxWidth" :width="width">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <br />
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card-text>
          <v-container grid-list-sm>
            <v-row>
              <v-col xs="12" sm="12" md="12">
                <div class="label-form">Tên sản phẩm</div>
                <v-text-field
                  placeholder="Tên bài viết"
                  outlined
                  dense
                  :rules="rulesTitle"
                  prepend-inner-icon="mdi-account"
                  v-model="form.title"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="12">
                <div class="label-form">Nội dung</div>
                <v-textarea
                  solo
                  placeholder="Nội dung"
                  outlined
                  dense
                  :rules="rulesContent"
                  prepend-inner-icon="mdi-note"
                  v-model="form.content"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog" class="mr-4">Đóng</v-btn>
          <v-btn type="submit" :loading="loading" color="primary"> Thêm </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosInstance from "@/plugins/axios";
export default {
  props: {
    title: { type: String, default: "Thêm mới " },
    maxWidth: { type: String },
    width: { type: String },
  },
  data: () => ({
    dialog: false,
    loading: false,
    form: {
      title: null,
      content: null,
    },
    rulesTitle: [(v) => !!v || "Tiêu đề không thể bỏ trống"],
    rulesContent: [(v) => !!v || "Nội dung không thể bỏ trống"],
  }),
  methods: {
    openDialog() {
      this.form.title = null;
      this.form.content = null;
      this.dialog = true;
    },
    closeDialog() {
      this.form.title = null;
      this.form.content = null;
      this.dialog = false;
    },
    async submitForm() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await axiosInstance.post("/post", this.form);
          this.$toasted.success("Thêm mới thành công");
          this.closeDialog();
          this.$emit("onDone");
        } catch (error) {
          const str = [];
          const obj = error.response.data.error;
          for (const key in obj) {
            const value = obj[key].join();
            if (Object.hasOwnProperty.call(obj, key)) {
              str.push(value);
            }
          }
          this.$toasted.error(`Lỗi :  ${str.join(" ; ")}`);
          this.closeDialog();
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
