<template>
  <v-app>
    <v-main>
      <div class="main">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
