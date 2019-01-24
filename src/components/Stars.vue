<template>
  <div class="stars">
    <span :class="classList[0] + ' star'"></span>
    <span :class="classList[1] + ' star'"></span>
    <span :class="classList[2] + ' star'"></span>
    <span :class="classList[3] + ' star'"></span>
    <span :class="classList[4] + ' star'"></span>
  </div>
</template>

<script>
export default {
  name: "stars",
  props: {
    rate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classList() {
      let classList = [];
      let on = "star-on";
      let off = "star-off";
      let half = "star-half";
      const addItem = (num, className) => {
        if (num <= 0) return false;
        for (let i = 0; i < num; i++) {
          classList.push(className);
        }
      };
      const onNum = Math.floor(this.rate);
      const halfNum = this.rate - onNum === 0 ? 0 : 1;
      const offNum = 5 - onNum - halfNum;
      addItem(onNum, on);
      addItem(halfNum, half);
      addItem(offNum, off);
      return classList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stars {
  text-align: center;
}
.star {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px !important;
}
.star-on {
  background: url(../assets/img/stars/star24_on@2x.png) center no-repeat;
}
.star-off {
  background: url(../assets/img/stars/star24_off@2x.png) center no-repeat;
}
.star-half {
  background: url(../assets/img/stars/star24_half@2x.png) center no-repeat;
}
</style>
