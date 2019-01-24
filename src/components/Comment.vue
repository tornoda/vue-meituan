<template>
  <div class="comment">
    <div class="content">
      <h1 :class="{title: isDetail, 'title-rating': isRating}">
        <span :class="{name: isDetail, 'name-rating': isRating}">{{name}}</span>
        <span :class="{time: isDetail, 'time-rating': isRating}">{{time}}</span>
        <div class="stars-wrapper">
          <span class="stars-label">评分</span>
          <app-stars class="stars" :rate="rate" v-if="isStarShow"/>
        </div>
      </h1>
      <div :class="{rating: isDetail, 'rating-rating': isRating}">{{content}}</div>
    </div>
    <img :class="{photo: isDetail, 'photo-rating': isRating}" :src="icon">
  </div>
</template>

<script>
import Stars from "./Stars.vue";
export default {
  name: "comment",
  computed: {
    user_icon: function() {
      if (!this.comment.user_icon) return "";
      return this.comment.user_icon;
    }
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    rate: {
      type: Number,
      default: 0
    },
    isStarShow: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isRating: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "app-stars": Stars
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment {
  position: relative;
  padding: 15px 14px 16px 16px;
  border-bottom: 1px solid #F4F4F4;
}
.content {
  padding-left: 51px;
}
.title {
  overflow: hidden;
}
.name {
  float: left;
  font-size: 12px;
  color: #333333;
  line-height: 17px;
}
.name-rating {
  float: left;
  font-size: 11px;
  color: #333333;
}
.time {
  float: right;
  font-size: 10px;
  color: #666;
}
.time-rating {
  float: right;
  font-size: 9px;
  color: #666;
}
.rating {
  line-height: 19px;
  font-size: 13px;
}
.rating-rating {
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  font-size: 16px;
}
.photo {
  position: absolute;
  top: 15px;
  left: 16px;
  width: 41px;
  height: 41px;
  border-radius: 50%;
}
.photo-rating {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 15px;
  left: 16px;
  border-radius: 50%;
}
.stars-wrapper {
  clear: both;
  text-align: left;
  padding-top: 12px;
  padding-bottom: 15px;
}
.stars-label {
  color: #999999;
  font-size: 11px;
  margin-right: 7px;
}
.stars {
  display: inline-block;
}
</style>
