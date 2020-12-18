<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      tpye: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoaded: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoaded) {
        this.$emit("swiperImageLoad");
        this.isLoaded = true;
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style></style>
