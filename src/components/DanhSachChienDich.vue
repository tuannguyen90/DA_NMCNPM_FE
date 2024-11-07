<template>
  <div v-if="danhSachChienDich.length">
    <ul class="container">
      <li v-for="chienDich in danhSachChienDich" class="item">
        <div class="item-leading">Icon</div>
        <div class="item-content">
          <!-- Leading -->
          <a
            class="item-title"
            href="#"
            @click.prevent="selectItem(chienDich)"
            >{{ chienDich.ten }}</a
          >
          <!-- Content -->
          <div class="item-desc">{{ chienDich.noiDung }}</div>
        </div>
        <!-- Trailing -->
        <div class="item-trailing">{{ chienDich.trangThai }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DanhSachChienDich",
  props: ["danhSachChienDich"],
  methods: {
    selectItem(chienDich) {
      this.$emit("on-select", chienDich);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  overflow: auto;
}

.item {
  min-height: 80px;
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
}

.item-leading {
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-content {
  flex-grow: 1;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 700;
}

.item-desc {
  font-size: medium;
  font-style: italic;
}

.item-trailing {
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
