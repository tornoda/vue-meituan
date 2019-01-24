<template>
  <div class="label">
    <span class="key-point">{{keyPoint}}</span>
    <span class="score">{{score}}</span>
  </div>
</template>

<script>
export default {
  name: "a-label",
  props: {
    keyPoint: {
      type: String,
      default: ""
    },
    score: {
      type: Number,
      default: 0
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  display: inline-block;
  font-size: 12px;
  line-height: 27px;
  padding-left: 10px;
  padding-right: 10px;
  color: #999999;
  background-color: #F4F4F4;
  margin-right: 6px;
  margin-bottom: 6px;
}
</style>