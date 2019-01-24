<template>
  <div class="header" :style="headerBg">
    <div class="search">
      <form class="input">
        <input class="w3-input" placeholder="点击搜索" type="text">
      </form>
      <div class="back">
        <span class="icon icon-arrow_lift"></span>
      </div>
      <div class="search-btn">
        <button>拼单</button>
        <div class="more-dots">
          <i class="dot"></i>
          <i class="dot"></i>
          <i class="dot"></i>
        </div>
      </div>
    </div>
    <div class="banner">
      <span class="banner-logo" :style="logoBg" alt="logo"></span>
      <span class="banner-name">{{poiInfo.name}}</span>
      <div class="banner-star">
        <img src="../assets/img/star.png" alt="star">
        <span>收藏</span>
      </div>
    </div>
    <div class="discount">
      <img class="discount-icon" :src="discountInfo.img" alt="discount-icon">
      <span class="discount-info">{{discountInfo.info}}</span>
      <a class="discount-num" @click="togglePopup">{{`${discountInfo.num}个活动 >`}}</a>
    </div>
    <transition name="popup">
      <div class="popup" v-show="isvisibility">
        <div class="popup-main" :style="popupBg">
          <div class="popup-logo" :style="logoBg"></div>
          <div class="popup-name">{{poiInfo.name}}</div>
          <div class="popup-stars">
            <rate-stars :rate="poiInfo.wm_poi_score"/>
          </div>
          <div
            class="popup-delivery-info"
          >{{poiInfo.min_price_tip + " " + poiInfo.shipping_fee_tip + " " + poiInfo.delivery_time_tip}}</div>
          <div class="popup-delivery-time">{{`配送时间：${poiInfo.shipping_time}`}}</div>
          <div
            v-for="(discount, index) in poiInfo.discounts2"
            :key="index"
            class="popup-discounts-items"
          >
            <div class="popup-discounts-item">
              <span>{{discount.info}}</span>
              <img :src="discount.icon_url" alt="discount-logo">
            </div>
          </div>
        </div>
        <span class="popup-close icon icon-close" @click="togglePopup"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import Stars from "./Stars.vue";
// import { mapState } from "vuex";
export default {
  name: "app-header",
  props: {
    poiInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isvisibility: false,
    visibleStyle: ""
  }),
  components: {
    "rate-stars": Stars
  },
  computed: {
    headerBg() {
      return `background-image: url(${this.poiInfo.head_pic_url});`;
    },
    logoBg() {
      return `background-image: url(${this.poiInfo.pic_url});`;
    },
    popupBg() {
      return `background-image: url(${this.poiInfo.poi_back_pic_url})`;
    },
    discountInfo() {
      if (this.poiInfo.discounts2 === undefined) return {}
      const firstOne = this.poiInfo.discounts2[0];
      const img = firstOne.icon_url;
      const info = firstOne.info;
      const num = this.poiInfo.discounts2.length;
      return { img, info, num };
    }
  },
  methods: {
    togglePopup() {
      // let visibility
      // visibility = this.isvisibility === false ? "visible" : "hidden";
      this.isvisibility = !this.isvisibility;
      // this.visibleStyle = `visibility: ${visibility}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(../common/css/icon.css);

.header {
  padding-top: 20px;
  height: 130px;
  background-size: 100% 100%;
  background-clip: border-box;
}
.search {
  height: 31px;
  padding: 0 104px 0 50px;
  position: relative;
}
.input {
  overflow: hidden;
  height: 29px;
}
.input input {
  border: 0;
  outline: none;
  border-radius: 20px;
  height: 29px;
  text-align: center;
  width: 100%;
  background: url(../assets/img/search.png) 10px no-repeat;
  background-size: 20px;
  background-color: #cdcdcc;
  box-sizing: border-box;
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: white;
}
.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 104px;
  line-height: 31px;
  /* background-color: ; */
}
.search-btn button {
  border: none;
  outline: 0;
  padding: 4px 0 4px 0;
  margin-left: 12px;
  width: 40px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none !important;
  color: white;
  background-color: black;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
}
.more-dots {
  display: inline-block;
  width: 52px;
  height: 31px;
  text-align: center;
  font-size: 5px;
  vertical-align: middle;
  line-height: 31px;
}
.dot {
  display: inline-block;
  width: 3px;
  height: 3px;
  border: 1px white solid;
  border-radius: 50%;
  margin-right: 2px;
}

/* banner */
.banner {
  padding: 17px 10px 11px;
}
.banner * {
  vertical-align: middle;
}
.banner-logo {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-position: center;
  background-size: 133% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}
.banner-name {
  color: white;
  padding-left: 12px;
  line-height: 50px;
  height: 50px;
}
.banner-star {
  width: 50px;
  height: 50px;
  padding-top: 7px;
  float: right;
}
.banner-star img {
  width: 20px;
  height: 20px;
  text-align: center;
}
.banner-star span {
  display: block;
  color: white;
  font-size: 11px;
  margin-top: 4px;
}

/* discount */
.discount {
  padding: 0 10px;
  color: white;
  font-size: 11px;
}
.discount * {
  vertical-align: middle;
}
.discount-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: center;
}
.discount-info {
  line-height: 16px;
  height: 16px;
  vertical-align: center;
}
.discount-num {
  float: right;
  line-height: 16px;
  height: 16px;
}
/* 弹窗 */
.popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(98, 98, 98, 0.8);
  z-index: 1;
  padding: 43px 20px 125px;
  text-align: center;
  color: white;
}
/* 弹窗动画 */
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
.popup-enter-to,
.popup-leave {
  opacity: 1;
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
}
.popup-main {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  padding: 60px 20px;
  box-sizing: border-box;
}
.popup-logo {
  background-size: 133% 100%;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-position: center;
  display: inline-block;
}
.popup-name {
  margin-top: 13px;
  font-size: 15px;
}
.popup-delivery-info {
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}
.popup-delivery-time {
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}
.popup-discounts-items {
  text-align: left;
  font-size: 11px;
  border-top: 1px solid #bababc;
  padding-top: 20px;
  margin-top: 20px;
}
.popup-discounts-item {
  padding-left: 23px;
  position: relative;
  height: 16px;
  line-height: 16px;
}
.popup-discounts-item * {
  vertical-align: middle;
}
.popup-discounts-item img {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 2px;
  top: 0px;
}
.popup-close {
  display: inline-block;
  width: 42px;
  height: 42px;
  background-color: rgba(118, 118, 118, 0.7);
  line-height: 42px;
  border-radius: 50%;
  margin-top: 20px;
}
</style>
