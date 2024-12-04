<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Bản đồ" />
    </template>

    <!-- Main -->
    <template v-slot:main> <BanDoThienTai /> </template>

    <!-- Secondary -->
    <template v-slot:secondary> </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import BanDoThienTai from "@/components/BanDoThienTai.vue";

export default {
  name: "MapsPage",
  components: {
    HomeLayout,
    Header,
    BanDoThienTai,
  },
};
</script>

<style scoped></style>
