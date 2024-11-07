<template>
  <div class="container">
    <div class="title">
      <div>{{ title }}</div>
    </div>
    <div class="profile">Profile</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title"],
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.title {
  font-size: xx-large;
  font-weight: 700;
}
</style>
