// @addItem 处理加一个货物的业务逻辑
// @deleteItem 处理减一个货物的业务逻辑
// 本组件只是ui层面上的逻辑
<template>
  <div class="wrapper">
    <span
      class="icon icon-remove_circle_outline"
      @click.prevent.stop="$emit('deleteItem')"
      v-if="number !==0"
    ></span>
    <span class="num" v-if="number !==0">{{number}}</span>
    <span class="icon icon-add_circle" @click.prevent.stop="$emit('addItem')"></span>
  </div>
</template>

<script>
export default {
  name: "addDelete",
  props: {
    number: {
      default: 0,
      type: Number
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper span {
  display: inline-block;
  width: 26px;
  height: 26px;
  vertical-align: middle;
  font-size: 26px;
  text-align: center;
}
.num {
  font-size: 20px !important;
}
.icon-add_circle {
  color: #ffd161;
}
.icon-remove_circle_outline {
  color: #b4b4b4;
}
</style>
