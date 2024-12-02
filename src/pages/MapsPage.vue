<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Bản đồ" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div id="map"></div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary> </template>
  </HomeLayout>
</template>

<script>
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import vietnamGeoJSON from "@/assets/geojson/vn-province.json";

import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";

export default {
  name: "MapsPage",
  components: {
    HomeLayout,
    Header,
  },
  mounted() {
    const map = L.map("map").setView([16.0471, 108.2068], 5); // Trung tâm Việt Nam

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Dữ liệu về tình hình thiên tai (thêm các tỉnh không bị ảnh hưởng với giá trị 0)
    const disasterData = {
      "An Giang": 0.8,
      "Bà Rịa -Vũng Tàu": 0.6,
      "Bắc Giang": 0.4,
      "Bắc Kạn": 0.3,
      "Bạc Liêu": 0.7,
      "Bắc Ninh": 0.5,
      "Bến Tre": 0.9,
      "Cà Mau": 0, // Các tỉnh không bị ảnh hưởng
      "Đà Nẵng": 0,
      "Hà Nội": 0,
      "TP Hồ Chí Minh": 0,
    };

    // Tạo dữ liệu Heatmap
    const heatData = [];
    vietnamGeoJSON.features.forEach((feature) => {
      const province = feature.properties.ten_tinh;
      if (province && disasterData[province] > 0) {
        const centroid = this.getCentroid(feature.geometry.coordinates);
        heatData.push([...centroid, disasterData[province]]);
      }
    });

    // Thêm lớp Heatmap
    L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    // Hiển thị các vùng (màu sắc tùy theo mức độ ảnh hưởng)
    L.geoJSON(vietnamGeoJSON, {
      style: (feature) => {
        const name = feature.properties.ten_tinh;
        const level = disasterData[name] || 0; // Mức độ thiên tai
        return {
          color: "blue", // Viền mặc định
          weight: 0.25,
          opacity: 1,
          fillColor: this.getColorByLevel(level), // Màu theo mức độ
          fillOpacity: level > 0 ? 0.6 : 0.2, // Độ mờ: rõ hơn cho vùng bị ảnh hưởng
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.ten_tinh || "Không xác định";
        const disasterLevel = disasterData[name] || 0;
        layer.bindPopup(`${name}: Ảnh hưởng thiên tai - ${disasterLevel}`);
      },
    }).addTo(map);
  },
  methods: {
    // Hàm tính Centroid
    getCentroid(coords) {
      let lat = 0,
        lng = 0,
        totalPoints = 0;
      coords[0].forEach((polygon) => {
        polygon.forEach(([lngPoint, latPoint]) => {
          lat += latPoint;
          lng += lngPoint;
          totalPoints++;
        });
      });
      return [lat / totalPoints, lng / totalPoints];
    },

    // Hàm xác định màu dựa trên mức độ ảnh hưởng
    getColorByLevel(level) {
      if (level > 0.7) return "red"; // Rất nghiêm trọng
      if (level > 0.5) return "orange"; // Nghiêm trọng
      if (level > 0.3) return "yellow"; // Trung bình
      if (level > 0) return "green"; // Nhẹ
      return "lightgrey"; // Không bị ảnh hưởng
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
