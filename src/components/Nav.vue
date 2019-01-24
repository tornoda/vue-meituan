<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      点 餐
      <span></span>
    </router-link>
    <router-link to="/ratings" class="nav-item">
      评 论({{ratingsNum}})
      <span></span>
    </router-link>
    <router-link to="/seller" class="nav-item">
      商 家
      <span></span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app-nav",
  computed: {
    ...mapState({
      ratingsNum: state => state.rates.comment_num
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-active {
  color: #ffbb22;
}
.nav {
  height: 40px;
  display: flex;
  text-align: center;
  border-bottom: 1px #e4e4e4 solid;
}
a {
  color: black;
  text-decoration: none;
  width: 100%;
}
.nav-item {
  display: inline-block;
  flex-grow: 1;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.router-link-active span {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 20px;
  height: 2px;
  background-color: #ffbb22;
  margin-left: -10px;
}
</style>
