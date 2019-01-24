<template>
  <section class="shop-cart">
    <section class="shop">
      <div class="shop-info">
        <div class="shop-total-price" v-if="totalPrice !== 0">￥{{totalPrice}}</div>
        <div :class="{'shop-delivery': true, 'shop-delivery-has': hasItem}">{{transportation}}</div>
      </div>
      <div :class="{'shop-carts-icon': true, 'shop-carts-has': hasItem}" @click="toggleList">
        <span :class="{'icon icon-shopping_cart': true, 'icon-shopping_cart-has': hasItem}"></span>
        <total-counts :counts="totalCounts" class="shop-total-counts"/>
      </div>
      <div
        :class="{'shop-btn': true, 'shop-btn-has': hasItem}"
      >{{totalPrice === 0 ? minPriceStr : '去结算'}}</div>
      <!-- 购物车展开 -->
    </section>
    <section class="shop-list">
      <transition name="filter">
        <div class="filter" v-if="isBagShow" @click="hideList"></div>
      </transition>
      <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:before-leave="beforeLeave">
        <div class="shop-list-main" v-show="isBagShow">
          <div class="shop-list-header" v-for="(promotInfo, index) in promotion" :key="index">
            <p>{{promotInfo}}</p>
          </div>
          <div class="shop-list-no1">
            <p class="shop-list-no1-header">
              <span class="shop-list-no1-title">1号口袋</span>
              <span class="shop-list-no1-delete" @click.stop.prevent="clearList">
                <img class="shop-list-no1-delete-icon" src="../assets/img/goods/ash_bin.png">
                <span>清空购物车</span>
              </span>
            </p>
            <ul>
              <li class="shop-list-oneitem" v-for="(item, i) in no1Bag" :key="'shopCart-' + i">
                <div class="shop-list-oneitem-name">
                  <p class="shop-list-name">{{item.name}}</p>
                  <p class="shop-list-unit">{{item.unit}}</p>
                </div>
                <add-delete
                  class="shop-list-oneitem-adddeletebtn"
                  :number="item.counts"
                  @addItem="addItem(item)"
                  @deleteItem="deleteItem(item)"
                />
                <div class="shop-list-oneitem-price">￥{{item.min_price}}</div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </section>
  </section>
</template>

<script>
import TotalCounts from "./TotalCounts";
import AddDelete from "./AddDelete";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "shop-carts",
  props: {
    totalCounts: {
      default: 0,
      type: Number
    },
    transportation: {
      default: "",
      type: String
    },
    totalPrice: {
      default: 0,
      type: Number
    },
    minPriceStr: {
      default: "",
      type: String
    },
    no1Bag: {
      // 所有被选中的商品数组
      default: () => [],
      type: Array
    },
    promotion: {
      default: [],
      type: Array
    }
  },
  data: () => ({
    isBagShow: false,
    shopBannerHeight: 0
  }),
  computed: {
    ...mapMutations(["ADD_ITEM", "DELETE_ITEM", "CLEAR_SHOP_CART"]),
    hasItem: function() {
      return this.totalCounts !== 0;
    },
    shopListHeigth: function() {
      const promotionHeigth = this.promotion.length * 30;
      const TITLE_HEIGHT = 30;
      const itemTotalHeight = this.promotion.length * 61;
      return promotionHeigth + TITLE_HEIGHT + itemTotalHeight + "px";
    }
  },
  watch: {
    no1Bag: function() {
      if (this.no1Bag.length === 0) this.isBagShow = false;
    }
  },
  methods: {
    // 这里的方法处理购物车列表出现时的动画
    beforeEnter: function(el) {
      const shopBannerHeight = document.querySelector(".shop").offsetHeight;
      this.shopBannerHeight = shopBannerHeight;
      el.style.top = `-${shopBannerHeight}px`;
    },
    enter: function(el, done) {
      const shopListHeight = document.querySelector(".shop-list-main")
        .offsetHeight;
      const top = shopListHeight + this.shopBannerHeight;
      el.style.top = `-${top}px`;
      done();
    },
    beforeLeave: function(el) {
      el.style.top = `-${this.shopBannerHeight}px`;
    },
    addItem: function(item) {
      const categoryIndex = item.categoryIndex,
        itemIndex = item.itemIndex,
        { commit } = this.$store;
      commit({
        type: "ADD_ITEM",
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    deleteItem: function(item) {
      const categoryIndex = item.categoryIndex,
        itemIndex = item.itemIndex,
        { commit } = this.$store;
      commit({
        type: "DELETE_ITEM",
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    toggleList: function() {
      if (!this.hasItem) return null;
      this.isBagShow = !this.isBagShow;
    },
    hideList: function() {
      this.isBagShow = false;
    },
    clearList: function() {
      const { commit } = this.$store;
      commit({
        type: "CLEAR_SHOP_CART"
      });
    }
  },
  components: {
    "total-counts": TotalCounts,
    "add-delete": AddDelete
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop-cart {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  /* height: 100%; */
}
.shop {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  padding-right: 110px;
  height: 51px;
  /* z-index: 2; */
  background-color: rgb(82, 80, 80);
}
.shop-info {
  padding-left: 5px;
}
.shop-total-price {
  padding-top: 5px;
  font-size: 18px;
  line-height: 26px;
  height: 26px;
  color: white;
}
.shop-delivery {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px;
  height: 51px;
}
.shop-delivery-has {
  height: 18px;
  line-height: 18px;
}
.shop-carts-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
  color: #c4c4c4;
  position: absolute;
  left: 10px;
  background-color: #666666;
  border-radius: 50%;
  top: -14px;
  text-align: center;
  font-size: 0;
  z-index: 1;
}
.shop-carts-has {
  background-color: #ffd161;
}
.icon-shopping_cart {
  vertical-align: middle;
  font-size: 28px;
}
.icon-shopping_cart-has {
  color: #2d2b2a;
}
.shop-total-counts {
  position: absolute;
  top: 0;
  right: 0;
}
.shop-btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(82, 80, 80);
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  color: #bab9b9;
  width: 110px;
  line-height: 51px;
}
.shop-btn-has {
  background-color: #ffd161;
  color: #2d2b2a;
}

/* 购物车详情 */
.shop-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 51px;
  z-index: -1;
}
.filter {
  position: fixed;
  top: 0;
  bottom: 51px;
  left: 0;
  right: 0;
  /* z-index: -1; */
  /* background-color: white; */
  background-color: rgba(7, 17, 27, 0.6);
}
/* 处理filter的动画 */
.filter-enter,
.filter-leave-to {
  opacity: 0;
}
.filter-leave,
.filter-enter-to {
  opacity: 1;
}
.filter-leave-active,
.filter-enter-active {
  transition: all 0.5s;
}
/* filter动画处理完毕 */
.shop-list-main {
  position: absolute;
  /* bottom: 51px; */
  left: 0px;
  right: 0px;
  transition: all 0.3s;
}
/* 处理shoplist的动画开始 */
/* .shop-list-enter-active,
.shop-list-leave-active {
  transition: all 0.5s;
} */
/* 处理shoplist的动画完毕 */
.shop-list-header {
  font-size: 11px;
  line-height: 30px;
  color: #646158;
  background-color: #f3e6c6;
  text-align: center;
}
.shop-list-no1-header {
  background-color: #f4f4f4;
  border-left: 4px solid #53c123;
  padding-right: 10px;
  overflow: hidden;
}
.shop-list-no1-title {
  height: 30px;
  line-height: 30px;
  text-align: left;
  background-color: #f4f4f4;
  font-size: 12px;
  padding-left: 6px;
  float: left;
}
.shop-list-no1-delete {
  font-size: 0;
  float: right;
  height: 30px;
  line-height: 30px;
}
.shop-list-no1-delete-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 9px;
}
.shop-list-no1-delete span {
  vertical-align: middle;
  font-size: 12px;
}
/* 购物车里面的商品 */
.shop-list-oneitem {
  height: 61px;
  padding: 12px 12px 10px;
  box-sizing: border-box;
  background-color: white;
}
.shop-list-oneitem-name {
  float: left;
  max-width: 300px;
  overflow: hidden;
}
.shop-list-name {
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  margin-bottom: 8px;
}
.shop-list-unit {
  font-size: 12px;
  color: #b4b4b4;
}
.shop-list-oneitem-price {
  float: right;
}
.shop-list-oneitem-adddeletebtn {
  float: right;
  margin-left: 20px;
  margin-top: 6px;
}
</style>
