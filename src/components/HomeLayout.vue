<template>
  <div class="container">
    <div class="item item-1">
      <!-- Header -->
      <slot name="header"></slot>
    </div>
    <div class="item item-2">
      <!-- Menu -->
      <Menu />
    </div>
    <div class="item item-3">
      <!-- Main -->
      <slot name="main"></slot>
    </div>
    <div class="item item-4">
      <!-- Aside -->
      <slot name="secondary"></slot>
    </div>
    <div class="item item-5">
      <!-- Footer -->
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
export default {
  name: "HomeLayout",
  components: {
    Menu,
  },
};
</script>

<style scoped>
.container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 80px 1fr 80px;
  grid-template-areas:
    "menu header header header header header header"
    "menu main main main secondary secondary secondary"
    "menu footer footer footer footer footer footer";
  overflow: hidden;
}

.item {
  background-color: whitesmoke;
}
.item-1 {
  grid-area: header;
}
.item-2 {
  grid-area: menu;
}
.item-3 {
  grid-area: main;
  overflow: auto;
}
.item-4 {
  grid-area: secondary;
  overflow: auto;
}
.item-5 {
  grid-area: footer;
}
</style>
