<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- <ul>
        <li v-for="item in $store.state.cartList">{{ item }}</li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //3. 请求推荐数据
      getRecommend().then(res => {
        //console.log(res);
        this.recommends = res.data.list;
      });

      //4.给  getThemeTopY: 赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      }, 100);

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //第一次获取，值不对
      //值不对的原因：this.$refs.params.$el 压根没有渲染
      // this.themeTopYs = [];

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   //第二次获取：值不对
      //   //值不对的原因：图片没有计算在内
      //   //根据最新的数据，对应DOM已经渲染出来
      //   //但是图片依然没有加载出来（目前获取到的offsetTop不包含其中的图片）
      //   //offsetTop值不对的时候，都是因为图片问题
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // });
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;

      //2.positionY和主题中值进行对比
      //[0, 6929, 7564, 7875, Number.MAX_VALUE]
      //position 在0 和 6929之间，index = 0
      //position 在06929和 7564之间，index = 1
      //position 在7564和 7875之间，index = 2
      //position 在超过7875，index = 3

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   positionY > this.themeTopYs[i] &&
        //   positionY < this.themeTopYs[i + 1]
        // ) {
        //   console.log(i);
        // }
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY <= this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
      //是否显示回到顶部
      this.listenShowBackTop(position);
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车
      //this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
    }
  },
  mounted() {},

  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  z-index: 9;
  background-color: #fff;
  position: relative;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  /* height: 300px; */

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
