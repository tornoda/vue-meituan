<template>
  <div class="goods">
    <div class="goods-wrap">
      <section class="goods-right">
        <!-- 活动 -->
        <section class="specials" id="part0">
          <img
            :src="item.pic_url"
            v-for="(item, index) in specials.operation_source_list"
            :key="index"
          >
        </section>
        <!-- 商品列表 -->
        <section class="all-items">
          <section
            class="group-item"
            v-for="(group, index) in foodsDetails"
            :key="index"
            :id="`part${index + 1}`"
          >
            <h1 class="group-title">{{group.name}}</h1>
            <div
              class="item"
              v-for="(item, idx) in group.spus"
              :key="idx"
              @click="showDetails(index, idx)"
            >
              <img v-lazy="item.picture" class="item-picture">
              <div class="item-info">
                <h1 class="item-title">{{item.name}}</h1>
                <div class="item-praise-and-saled">
                  <span class="item-month-saled">月售{{item.month_saled}}</span>
                  <span class="item-praise">{{item.praise_content}}</span>
                </div>
                <div class="item-price">
                  <span class="item-price-digi">{{item.min_price + "元 "}}</span>
                  <span class="item-unit">{{item.unit}}</span>
                </div>
              </div>
              <!-- 加减商品 -->
              <add-delete
                class="item-add-delete"
                @addItem="addItem(index, idx)"
                @deleteItem="deleteItem(index, idx)"
                :number="item.counts"
              />
            </div>
          </section>
        </section>
      </section>
    </div>
    <!-- 左侧导航 -->
    <section class="nav-left-wrap">
      <ul class="nav-left">
        <li
          :class="{'item-type': true,'type-active': currenIndex === index }"
          v-for="(item, index) in types"
          :key="index"
          @click="showOne(index)"
        >
          <img class="type-icon" v-lazy="item.icon" v-if="item.icon">
          <span class="type-name">{{item.name}}</span>
          <total-counts
            v-if="index !== 0"
            :counts="everyCategorySelectedNum[index - 1]"
            class="type-counts"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import BScroll from "better-scroll";
import AddDelete from "./AddDelete";
import TotalCounts from "./TotalCounts";
import type from "../store/type.js";
export default {
  name: "goods",
  computed: {
    ...mapState({
      types: state => state.goods.types,
      specials: state => state.goods.specials,
      foodsDetails: state => state.goods.foodsDetails,
      shopCartsInfo: ({ header }) => {
        const { shipping_fee_tip, min_price_tip } = header;
        return {
          transportation: shipping_fee_tip,
          minPrice: min_price_tip
        };
      },
      details: state => state.details,
      appTopScroll: state => state.appTopScroll
    }),
    ...mapGetters([
      "everyCategorySelectedNum",
      "totalCounts",
      "totalPrice",
      "selectedItem",
      "promotion"
    ])
  },
  data: () => ({
    currenIndex: 0,
    heightList: [],
    isFirstUpdated: true,
    goodScorll: null,
    isItemDetailsShow: false
  }),
  methods: {
    ...mapMutations([
      type.ADD_ITEM,
      type.DELETE_ITEM,
      type.SHOW_DETAILS,
      type.TOGGLE_DETAILS,
      type.CHANGE_THE_IS_FIRST_TIME_RENDERED_STATUS,
      type.TOGGLE_SHOP_CARTS
    ]),
    addNavStyle(index) {
      this.currenIndex = index;
    },
    showOne(index) {
      const currentY = index === 0 ? 0 : this.heightList[index - 1];
      //这里-2是为了消除元素高度四舍五入带来的影响。
      this.goodScorll.scrollTo(0, -currentY - 2, 300);
      this.addNavStyle(index);
    },
    makeItScrollable() {
      new BScroll(".nav-left-wrap", {
        click: true,
        tap: true
      });
      const goodScorll = new BScroll(".goods-wrap", {
        probeType: 2,
        // click: true,
        // tap: true
      });
      this.goodScorll = goodScorll;
    },
    navJumpToRightWhenScroll() {
      const _this = this;
      this.goodScorll.on("scroll", ({ y }) => {
        const yAb = Math.abs(y);
        const jumpFunc = _this.getJumpFunc();
        jumpFunc(yAb, _this);
      });
    },
    getJumpFunc() {
      //这样的写法有助于性能，使用判断而不是用循环
      let i = 0;
      let func = `(function () { return function (y, context) {`;
      const length = this.heightList.length;
      while (i < length) {
        const current = this.heightList[i - 1] || 0;
        const next = this.heightList[i];
        const lastIndex = length - 1;
        let partition = "";
        switch (i) {
          case 0:
            partition = `if(y > 0 && y< ${next}) { context.addNavStyle(${i}) }`;
            break;
          case lastIndex:
            partition = `else { context.addNavStyle(${i}) }};})();`;
            break;
          default:
            partition = `else if (y > ${current} && y <${next}) { context.addNavStyle(${i}) }`;
            break;
        }
        func += partition;
        i++;
      }
      return eval(func);
    },
    getGoodsHeight() {
      const specials = document.querySelector(".specials");
      const itemList = document.querySelectorAll(".group-item");
      let heightList = [];
      heightList.push(specials.offsetHeight);
      itemList.forEach((element, index) => {
        const eleHeight = element.offsetHeight;
        const preheight = heightList[index];
        heightList.push(preheight + eleHeight);
      });
      // console.log(heightList);
      this.heightList = heightList;
    },
    addItem(categoryIndex, itemIndex) {
      const { commit } = this.$store;
      commit({
        type: "ADD_ITEM",
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    deleteItem(categoryIndex, itemIndex) {
      const { commit } = this.$store;
      commit({
        type: "DELETE_ITEM",
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    showDetails(categoryIndex, itemIndex) {
      const { commit } = this.$store;
      // this.isItemDetailsShow = true;
      commit({
        type: type.TOGGLE_DETAILS,
        payload: { toggleType: "SHOW" }
      });
      commit({
        type: type.SHOW_DETAILS,
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    }
  },
  mounted() {
    this.makeItScrollable();
    // 第一次进入其他路由，如/ratings，再进入/goods时需要这里计算滚动函数
    this.getGoodsHeight();
    this.navJumpToRightWhenScroll();
  },
  updated() {
    // console.log("updated");
    // 直接访问/goods这个路由的时候，mounted钩子调用的时候，数据还没有更新（使用的是state里面的默认数据），所以无法计算出滚动函数
    if (!this.isFirstUpdated) return null;
    this.getGoodsHeight();
    this.navJumpToRightWhenScroll();
    this.isFirstUpdated = false;
  },
  beforeRouteLeave: function(to, from, next) {
    const { commit } = this.$store;
    commit({
      type: "TOGGLE_SHOP_CARTS",
      payload: {
        type: "HIDE"
      }
    });
    next();
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const { commit } = vm.$store;
      commit({
        type: "TOGGLE_SHOP_CARTS",
        payload: {
          type: "SHOW"
        }
      });
    });
  },
  components: {
    "add-delete": AddDelete,
    "total-counts": TotalCounts,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  /* position: fixed; */
  position: absolute;
  top: 190px;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.nav-left-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 85px;
  /* z-index: 1; */
  bottom: 0px;
  right: 0;
}
.nav-left {
  font-size: 13px;
  border-bottom: 1px solid #e4e4e4;
  background-color: #f4f4f4;
  width: 85px;
  /* top: 0;
  left: 0; */
}
.type-icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  padding: 2px;
}
.item-type {
  width: 52px;
  padding: 16px 23px 15px 10px;
  text-align: center;
  line-height: 15px;
  /* height: 15px; */
  /* font-size:  */
  position: relative;
}
.type-name {
  vertical-align: middle;
}
.type-active {
  background-color: white;
}
/* 分类已选数量小红点 */
.type-counts {
  position: absolute;
  right: 5px;
  top: 5px;
}
/* 商品详情 */
.goods-wrap {
  position: absolute;
  padding-left: 85px;
  top: 0;
  left: 0;
  /* z-index: -1; */
  bottom: 0px;
  right: 0;
}
.goods-right {
  width: 100%;
  box-sizing: border-box;
}

/* 上面的活动 */
.specials {
  padding: 11px 11px 22px;
  width: 100%;
  box-sizing: border-box;
}
.specials img {
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 11px;
}
/* list详情 */
.all-items {
  padding-left: 11px;
  padding-right: 11px;
}
.group-title {
  line-height: 13px;
  height: 13px;
  font-size: 13px;
  background: url(../assets/img/goods/btn_yellow_highlighted@2x.png) left center
    no-repeat;
  background-size: 2px 10px;
  padding-left: 6px;
}
.item {
  height: 75px;
  padding-bottom: 25px;
  font-size: 0;
  line-height: 75px;
  position: relative;
}
.item-picture {
  width: 63px;
  margin-right: 11px;
  vertical-align: middle;
}
.item-info {
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
}
.item-title {
  margin-top: 5px;
  font-size: 16px;
}
.item-praise-and-saled {
  margin-bottom: 3px;
  margin-top: 2px;
  font-size: 12px;
  color: #bfbfbf;
}
.item-month-saled {
  margin-right: 14px;
}
.item-price {
  margin-bottom: 5px;
  font-size: 14px;
  color: #bfbfbf;
}
.item-price-digi {
  color: #fb4e44;
}
.item-add-delete {
  position: absolute;
  right: 20px;
  bottom: 35px;
  height: 26px;
  line-height: 26px;
}
/* 加减商品 */

/* 最下面结算信息 */
.shop-summary {
  position: fixed;
  bottom: 0px;
}

/* 商品详情 */
.foods-details {
  position: fixed;
  top: 0;
  bottom: 51px;
  width: 100%;
  /* left: 0; */
  background-color: white;
  z-index: 1;
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
  transition: all 0.3s;
}
</style>