<template>
  <div class="rating-container">
    <div class="star" @click.prevent="doRating(1)">
      <i
        :class="
          rating >= 0.5 ? 'fa-solid fa-star fa-lg' : 'fa-regular fa-star fa-lg'
        "
        style="color: #ffd43b"
      ></i>
    </div>

    <div class="star" @click.prevent="doRating(2)">
      <i
        :class="
          rating >= 1.5 ? 'fa-solid fa-star fa-lg' : 'fa-regular fa-star fa-lg'
        "
        style="color: #ffd43b"
      ></i>
    </div>

    <div class="star" @click.prevent="doRating(3)">
      <i
        :class="
          rating >= 2.5 ? 'fa-solid fa-star fa-lg' : 'fa-regular fa-star fa-lg'
        "
        style="color: #ffd43b"
      ></i>
    </div>

    <div class="star" @click.prevent="doRating(4)">
      <i
        :class="
          rating >= 3.5 ? 'fa-solid fa-star fa-lg' : 'fa-regular fa-star fa-lg'
        "
        style="color: #ffd43b"
      ></i>
    </div>

    <div class="star" @click.prevent="doRating(5)">
      <i
        :class="
          rating >= 4.5 ? 'fa-solid fa-star fa-lg' : 'fa-regular fa-star fa-lg'
        "
        style="color: #ffd43b"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: ["ratingProp", "canRating"],
  data() {
    return {
      rating: 0,
    };
  },
  mounted() {
    this.rating = this.ratingProp;
  },
  watch: {
    ratingProp(newValue) {
      this.rating = newValue;
    },
  },
  methods: {
    doRating(level) {
      if (this.canRating) {
        this.rating = level;
        this.$emit("doRating", level);
      }
    },
  },
};
</script>

<style scoped>
.rating-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.star {
  margin-right: 2px;
}
</style>
