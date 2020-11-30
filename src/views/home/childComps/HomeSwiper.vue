<template>
  <swiper ref="swiper"
          v-if="banners.length">
    <swiper-item v-for="(item,index) in banners"
                 :key="item.id">
      <a :href="item.link">
        <img :src="item.image"
             alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      tpye: Array,
    }
  },
  data () {
    return {
      isLoaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem,

  }
}
</script>

<style>
</style>