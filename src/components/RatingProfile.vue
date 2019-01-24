<template>
  <div class="rating-profile">
    <div class="shop-score">
      <div class="score">{{shopScore}}</div>商家评分
    </div>
    <div class="star">
      <div class="taste-wrapper">
        <span class="taste">口味</span>
        <app-stars class="taste-stars" :rate="foodScore"/>
      </div>
      <div class="package-wrapper">
        <span class="package">包装</span>
        <app-stars class="taste-stars" :rate="packScore"/>
      </div>
    </div>
    <div class="delivery">
      <div class="delivery-score">{{deliveryScore}}</div>
      <div class="delivery-text">配送评分</div>
    </div>
  </div>
</template>

<script>
import Stars from "./Stars.vue";
export default {
  name: "rating-profile",
  props: {
    shopScore: {
      type: Number,
      default: 0
    },
    foodScore: {
      type: Number,
      default: 0
    },
    packScore: {
      type: Number,
      default: 0
    },
    deliveryScore: {
      type: Number,
      default: 0
    }
  },
  components: {
    "app-stars": Stars
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating-profile {
  padding-top: 20px;
  padding-bottom: 18px;
  padding-left: 26px;
  overflow: hidden;
}
.shop-score {
  font-size: 11px;
  color: #666666;
  margin-right: 26px;
  text-align: center;
  float: left;
}
.score {
  font-size: 23px;
  color: #ffb000;
  margin-bottom: 9px;
  text-align: center;
}
.star {
  font-size: 11px;
  margin-right: 11px;
  color: #666;
  float: left;
}
.taste-wrapper {
  padding-top: 3px;
  padding-bottom: 14px;
}
.taste {
  margin-bottom: 14px;
}
.taste-stars {
  display: inline-block;
}
.taste,
.package {
  padding-right: 11px;
}
.delivery {
  float: right;
  width: 101px;
  font-size: 19px;
  color: #999999;
  line-height: 32px;
  border-left: 1px solid #9d9d9d;
  text-align: center;
}
.delivery-score {
    margin-top: 3px;
    margin-bottom: 10px;
    line-height: 19px;
}
.delivery-text {
    font-size: 11px;
    line-height: 11px;
}
</style>