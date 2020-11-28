<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <i slot="item-icon"
           class="iconfont">&#xe662;</i>
        <i slot="item-icon-active"
           class="iconfont">&#xe667;</i>
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <i slot="item-icon"
           class="iconfont">&#xe661;</i>
        <i slot="item-icon-active"
           class="iconfont">&#xe660;</i>
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <i slot="item-icon"
           class="iconfont">&#xe664;</i>
        <i slot="item-icon-active"
           class="iconfont">&#xe663;</i>
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <!-- activeColor="blue" -->
        <i slot="item-icon"
           class="iconfont">&#xe665;</i>
        <i slot="item-icon-active"
           class="iconfont">&#xe666;</i>
        <div slot="item-text">我的</div>
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem

  }
}
</script>

<style>
</style>