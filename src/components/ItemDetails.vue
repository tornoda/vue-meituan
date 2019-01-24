<template>
  <div class="details-wrapper">
    <div class="details">
      <section class="header">
        <img :src="details.picture" alt="foodImgs">
        <span class="close icon icon-arrow_lift" @click.stop="hideDetails"></span>
        <span class="share"></span>
        <span class="more"></span>
      </section>
      <section class="content">
        <h1 class="title">{{details.name}}</h1>
        <h3 class="month-sale">{{details.month_saled_content}}</h3>
        <img
          v-if="details.product_label_picture"
          class="label-pic"
          :src="details.product_label_picture"
          alt="label-pic"
        >
        <h2 class="price">
          <span>￥{{details.min_price}}</span>
          /{{details.unit}}
        </h2>
        <add-delete
          class="add-and-delete"
          :number="details.counts"
          @addItem="addItem"
          @deleteItem="deleteItem"
        />
      </section>
      <section class="ratings">
        <h1 class="ratings-header">
          <span class="ratings-title">{{details.rating.title}}</span>
          <span class="ratings-num">
            {{details.rating.snd_title}}
            <span class="icon icon-keyboard_arrow_right"></span>
          </span>
        </h1>
        <div
          class="ratings-content"
          v-for="(comment, index) in details.rating.comment_list"
          :key="index"
        >
          <app-comment
            :isDetail="true"
            :name="comment.user_name"
            :time="comment.comment_time"
            :content="comment.comment_content"
            :icon="comment.user_icon"
            :isStarShow="false"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import AddDelete from "./AddDelete.vue";
import BScroll from "better-scroll";
import type from "../store/type.js";
export default {
  name: "item-details",
  components: {
    "app-comment": Comment,
    "add-delete": AddDelete
  },
  props: {
    details: {
      default: () => ({}),
      type: Object
    }
  },
  mounted: function() {
    new BScroll(".details-wrapper", {
      click: true,
      tap: true
    });
  },
  methods: {
    addItem: function() {
      const { commit } = this.$store;
      const { categoryIndex, itemIndex } = this.details;
      commit({
        type: type.ADD_ITEM,
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    deleteItem: function() {
      const { commit } = this.$store;
      const { categoryIndex, itemIndex } = this.details;
      commit({
        type: type.DELETE_ITEM,
        payload: {
          categoryIndex,
          itemIndex
        }
      });
    },
    hideDetails: function() {
      const { commit } = this.$store;
      commit({
        type: type.TOGGLE_DETAILS,
        payload: { toggleType: "HIDE" }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details-wrapper {
  width: 100%;
  height: 100%;
}
.header {
  position: relative;
}
.header img {
  width: 100%;
}
.icon-arrow_lift {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  left: 10px;
  color: #7f7f7f;
  line-height: 30px;
  text-align: center;
}
.share {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 50px;
  background: url(../assets/img/details/share.png) center center no-repeat;
  background-size: 30px 30px;
}
.more {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  background: url(../assets/img/details/more.png) center center no-repeat;
  background-size: 30px 30px;
}
.content {
  padding-bottom: 16px;
  padding-left: 16px;
  position: relative;
}
.title {
  font-size: 15px;
  text-align: left;
  line-height: 30px;
  font-weight: bold;
}
.month-sale {
  font-size: 11px;
  margin-bottom: 6px;
  color: #9d9d9d;
}
.label-pic {
  display: block;
  margin-bottom: 16px;
  height: 15px;
}
.price {
  color: #9d9d9d;
  font-size: 11px;
}
.price span {
  color: #fb4e44;
  font-size: 17px;
}
.add-and-delete {
  position: absolute;
  right: 12px;
  bottom: 10px;
}
/* 评论区 */
.ratings {
  padding-left: 16px;
  padding-right: 16px;
  overflow: hidden;
}
.ratings-header {
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 13px;
  line-height: 13px;
  overflow: hidden;
}
.ratings-title {
  font-weight: bold;
  float: left;
}
.ratings-num {
  color: #9d9d9d;
  float: right;
}
</style>
