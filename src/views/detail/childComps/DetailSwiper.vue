<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item.id">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {}
};
</script>

<style>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
