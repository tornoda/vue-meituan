<template>
  <div class="seller-wrapper">
    <div class="seller">
      <section class="main">
        <div class="main-address">
          {{seller.address}}
          <span class="main-call-icon"></span>
        </div>
        <div class="main-photo">
          <div class="main-photo-wrapper" :style="wrapperWidthStyle">
            <img
              class="main-photo-one"
              v-for="(img, key) in thumbnailsUrlList"
              :key="key"
              :src="img"
            >
          </div>
        </div>
        <div class="main-detailinfo">查看食品档案</div>
      </section>
      <section class="delivery">
        <div class="delivery-service">配送服务：{{seller.app_delivery_tip}}</div>
        <div class="delivery-time">配送时间：{{seller.shipping_time}}</div>
      </section>
      <section class="service">
        <div class="service-many">
          <span>商家服务</span>
          <span class="service-one" v-for="(val, key) in seller.poi_service" :key="key">
            <img :src="val.icon" alt="icon">
            <span>{{val.content}}</span>
          </span>
        </div>
        <div class="service-discounts">
          <div class="service-discount" v-for="(val, key) in seller.discounts2" :key="key">
            <img :src="val.icon_url" alt="icon">
            <span>{{val.info}}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import type from "../store/type.js";
export default {
  name: "seller",
  created: function() {
    if (this.seller.id !== undefined) return null;
    const { dispatch } = this.$store;
    dispatch(type.FETCH_SELLER);
  },
  computed: {
    ...mapState(["seller"]),
    thumbnailsUrlList: function() {
      if (typeof this.seller.poi_env === "undefined") return [];
      return this.seller.poi_env.thumbnails_url_list;
    },
    wrapperWidthStyle: function() {
      if (typeof this.seller.poi_env === "undefined") return null;
      const imgNumber = this.seller.poi_env.thumbnails_url_list.length;
      const width = imgNumber * 102;
      return `width: ${width}px;`;
    }
  },
  mounted: function() {
    new BScroll(".main-photo", { scrollX: true });
    new BScroll(".seller-wrapper");
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const { commit } = vm.$store;
      commit({
        type: type.TOGGLE_SHOP_CARTS,
        payload: {
          type: "HIDE"
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seller-wrapper {
  position: absolute;
  top: 191px;
  left: 0;
  bottom: -51px;
  right: 0px;
  overflow: hidden;
  background-color: rgb(244, 244, 244);
}
.main,
.delivery,
.service {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
  line-height: 16px;
  background-color: white;
  margin-top: 10px;
}
.main-address {
  padding: 15px 91px 15px 26px;
  background: url(../assets/img/seller/address.png) no-repeat left center;
  background-size: 14px 16px;
  position: relative;
  border-bottom: 1px solid #f4f4f4;
}
.main-call-icon {
  position: absolute;
  right: -15px;
  top: 0;
  bottom: 0;
  width: 60px;
  background: url(../assets/img/seller/phone.png) no-repeat center center;
  background-size: 18px 18px;
  box-sizing: border-box;
}
.main-photo {
  width: 100%;
  overflow: hidden;
}
.main-photo-one {
  width: 93px;
  height: 75px;
  margin-right: 9px;
  border-radius: 2px;
}
.main-detailinfo {
  padding-left: 26px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: url(../assets/img/seller/safety.png) no-repeat left center;
  background-size: 14px 16px;
}
.delivery-service {
  padding-left: 26px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: url(../assets/img/seller/delivery.png) no-repeat left center;
  background-size: 14px 16px;
  border-bottom: 1px solid #f4f4f4;
}
.delivery-time {
  padding-left: 26px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: url(../assets/img/seller/time.png) no-repeat left center;
  background-size: 16px 16px;
}
.service-many {
  padding-left: 26px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: url(../assets/img/seller/server.png) no-repeat left center;
  background-size: 16px 16px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 0px;
}
.service-many span {
  font-size: 14px;
}
.service-many * {
  vertical-align: middle;
}
.service-one {
  font-size: 0;
}
.service-one span {
  font-size: 14px;
}
.service-one img {
  width: 16px;
  height: 16px;
  margin-left: 17px;
  margin-right: 6px;
}
.service-discount {
  font-size: 0;
}
.service-discount img {
  width: 16px;
  height: 16px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
.service-discount span {
  font-size: 14px;
  vertical-align: middle;
}
</style>
