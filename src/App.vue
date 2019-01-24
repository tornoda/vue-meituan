<template>
  <div id="app-root">
    <transition name="app">
      <div id="app-wrapper" class="app" v-show="!isDetailsShow">
        <div id="app">
          <app-header :poi-info="header"/>
          <app-nav/>
          <transition name="main">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="details">
      <div class="foods-details" v-if="isDetailsShow">
        <item-details :details="details"/>
      </div>
    </transition>
    <transition name="shop-carts">
      <shop-carts
        v-if="isShopCartsShow"
        class="shop-summary"
        :totalCounts="totalCounts"
        :transportation="shopCartsInfo.transportation"
        :totalPrice="totalPrice"
        :minPriceStr="shopCartsInfo.minPrice"
        :no1Bag="selectedItem"
        :promotion="promotion"
      />
    </transition>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";
import ItemDetails from "./components/ItemDetails.vue";
import ShopCarts from "./components/ShopCarts.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import BScroll from "better-scroll";
import type from "./store/type.js";
import setHeightOfWrapper from "./utilities/setHeightOfWrapper.js";
export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-nav": Nav,
    "item-details": ItemDetails,
    "shop-carts": ShopCarts
  },
  data: () => ({
    isFirstTimeUpdated: true
  }),
  computed: {
    ...mapState([
      "header",
      "isDetailsShow",
      "details",
      "isShopCartsShow",
      "movingStatus"
    ]),
    ...mapState({
      shopCartsInfo: ({ header }) => {
        const { shipping_fee_tip, min_price_tip } = header;
        return {
          transportation: shipping_fee_tip,
          minPrice: min_price_tip
        };
      }
    }),
    ...mapGetters(["totalCounts", "totalPrice", "selectedItem", "promotion"])
  },
  created() {
    const { dispatch } = this.$store;
    dispatch(type.FETCH_HEAD_AND_GOODS);
    dispatch(type.FETCH_RATES);
  },
  mounted() {
    this.makeItScrallable("#app-wrapper");
  },
  updated: function() {
    if (!this.isFirstTimeUpdated) return null;
    const scrollHeight = this.calTheScrollHeightOfHome();
    this.setHeightOfWrapper({
      appSelector: "#app",
      height: scrollHeight
    });
    this.isFirstTimeUpdated = false;
  },
  methods: {
    ...mapMutations([type.SAVE_APP_TOP_SCROLL]),
    makeItScrallable: function(selector) {
      return new BScroll(selector, {
        bounce: false,
        probeType: 2,
        click: true,
        tap: true
      });
    },
    //获取包含首部在内的滚动高度，固定其高度，让他滚动正好到nav时无法滚动，
    //此时，ｇｏｏｄ里面的商品内容还能够滚动
    calTheScrollHeightOfHome: function() {
      const viewportHeight = document.querySelector("html").offsetHeight;
      const pannelHeight = document.querySelector(".header").offsetHeight;
      const shopListHeight = document.querySelector(".shop").offsetHeight;
      return viewportHeight + pannelHeight - shopListHeight;
    },
    // setTheScrollHeightOfHome: function({ appSelector, height }) {
    //   document.querySelector(appSelector).style.height = height + "px";
    // },
    setHeightOfWrapper
  }
};
</script>

<style scoped>
/* 详情显示的时候，首页移除的动画 */
#app-root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}
#app-wrapper {
  /* position: fixed; */
  position: absolute;
  top: 0;
  bottom: 51px;
  width: 100%;
}
.app-enter,
.app-leave-to {
  left: -100%;
}
.app-leave,
.app-enter-to {
  left: 0;
}
.app-enter-active,
.app-leave-active {
  transition: all 0.7s;
}
/* 商品详情 */
.foods-details {
  position: fixed;
  top: 0;
  bottom: 0px;
  width: 100%;
  /* left: 0; */
  background-color: white;
  /* z-index: 1; */
}
/* 商品详情动画 */
.details-enter,
.details-leave-to {
  left: 100%;
}
.details-enter-to,
.details-leave {
  left: 0;
}
.details-enter-active,
.details-leave-active {
  transition: all 0.7s;
}
/* 动画分割 */
.main-enter,
.main-leave-to {
  opacity: 0;
}
.main-enter-t0,
.main-leave {
  opacity: 1;
}
.main-enter-active,
.main-leave-active {
  transition: all 0.3s;
}

/* 最下面结算信息 */
.shop-summary {
  position: fixed;
  bottom: 0px;
}
/* 购物车动画，显示与隐藏的动画 */
.shop-carts-leave-to,
.shop-carts-enter {
  bottom: -70px;
}
.shop-carts-enter-to,
.shop-carts-leave {
  bottom: 0px;
}
.shop-carts-enter-active,
.shop-carts-leave-active {
  transition: bottom 0.5s;
}
</style>
