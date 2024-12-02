<template>
  <div v-if="danhSachChienDich.length">
    <ul class="container">
      <li v-for="chienDich in danhSachChienDich" class="item">
        <!-- Leading -->
        <div class="item-leading">
          <i class="fa-solid fa-paper-plane fa-xl"></i>
        </div>
        <div class="item-content">
          <!-- Title -->
          <div class="item-title">
            {{ chienDich.ten }}
          </div>
          <!-- Content -->
          <div class="item-desc">{{ chienDich.noiDung }}</div>

          <!-- Buttons -->
          <div class="buttons">
            <!-- Chỉnh sửa -->
            <div
              style="margin-right: 16px"
              @click.prevent="selectItem(chienDich)"
            >
              <button>Chỉnh sửa</button>
            </div>
            <!-- Xóa -->
            <div @click.prevent="">
              <button>Xóa</button>
            </div>
          </div>
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
  font-size: x-large;
}

.item-desc {
  margin-top: 8px;
  font-size: large;
}

.item-trailing {
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons {
  height: 100%;
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
</style>
