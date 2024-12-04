<template>
  <div class="ban-do-container">
    <span style="font-size: x-large; font-weight: 700"
      >Bản đồ thiệt hãi bão Yagi</span
    >
    <div id="map"></div>
  </div>
</template>

<script>
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import vietnamGeoJSON from "@/assets/geojson/vn-province.json";

export default {
  name: "BanDoThienTai",
  mounted() {
    const map = L.map("map").setView([16.0471, 108.2068], 5); // Trung tâm Việt Nam

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Dữ liệu về tình hình thiên tai (thêm các tỉnh không bị ảnh hưởng với giá trị 0)
    const disasterData = {
      "Lào Cai": {
        economicLoss: 6834.0,
        severity: 0.28835443037974684,
        humanImpact: 151,
      },
      "Cao Bằng": {
        economicLoss: 0.0,
        severity: 0.0,
        humanImpact: 57,
      },
      "Yên Bái": {
        economicLoss: 5738.0,
        severity: 0.2421097046413502,
        humanImpact: 54,
      },
      "Quảng Ninh": {
        economicLoss: 23700.0,
        severity: 1.0,
        humanImpact: 29,
      },
      "Hải Phòng": {
        economicLoss: 12249.0,
        severity: 0.5168354430379747,
        humanImpact: 0,
      },
      "Bắc Giang": {
        economicLoss: 5000.0,
        severity: 0.2109704641350211,
        humanImpact: 0,
      },
      "Hưng Yên": {
        economicLoss: 3637.0,
        severity: 0.15345991561181435,
        humanImpact: 0,
      },
      "Phú Thọ": {
        economicLoss: 1588.0,
        severity: 0.0670042194092827,
        humanImpact: 0,
      },
      "Bắc Ninh": {
        economicLoss: 1194.0,
        severity: 0.05037974683544304,
        humanImpact: 0,
      },
      "Thái Bình": {
        economicLoss: 1479.0,
        severity: 0.06240506329113924,
        humanImpact: 0,
      },
      "Nam Định": {
        economicLoss: 1142.0,
        severity: 0.04818565400843882,
        humanImpact: 0,
      },
    };
    // Tạo dữ liệu Heatmap
    const heatData = [];
    vietnamGeoJSON.features.forEach((feature) => {
      const province = feature.properties.ten_tinh;
      if (
        province &&
        disasterData[province] &&
        disasterData[province].severity > 0
      ) {
        const centroid = this.getCentroid(feature.geometry.coordinates);
        heatData.push([...centroid, disasterData[province].severity]);
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
        const level = disasterData[name]?.severity || 0; // Mức độ thiên tai
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
        const data = disasterData[name];
        if (data) {
          layer.bindPopup(
            `${name}:<br>
      Thiệt hại về người: ${data.humanImpact}<br>
      Thiệt hại kinh tế: ${(data.economicLoss / 1000).toFixed(2)} tỷ VNĐ`
          );
        } else {
          layer.bindPopup(`${name}: Không bị ảnh hưởng`);
        }
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
.ban-do-container {
  height: 100%;
  width: 100%;
}
#map {
  width: 90%;
  height: 90%;
}
</style>
