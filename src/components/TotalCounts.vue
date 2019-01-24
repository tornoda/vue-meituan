<template>
  <span v-if="counts !== 0" class="counts">{{counts}}</span>
</template>

<script>
export default {
  name: "total-counts",
  props: {
    counts: {
      type: Number,
      default: 0
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counts {
  width: 16px;
  height: 16px;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  color: white;
  background-color: red;
}
</style>
