<template>
  <div class="ratings-wrapper">
    <div class="ratings">
      <rating-profile
        :shopScore="rates.comment_score"
        :foodScore="rates.food_score"
        :packScore="rates.pack_score"
        :deliveryScore="rates.delivery_score"
      />
      <div class="division"></div>
      <div class="content">
        <div class="header">
          <div class="nav">
            <span
              :class="['nav-all', navActiveAll]"
              @click="showComments('all')"
            >{{rates.tab[0].comment_score_title}}</span>
            <span
              :class="['nav-with-photo', navActiveWithPhoto]"
              @click="showComments('photo')"
            >{{rates.tab[1].comment_score_title}}</span>
            <span :class="['nav-dp', navActiveDp]" @click="showComments('dp')">
              <img
                class="nav-dp-active"
                src="../assets/img/ratings/dp_active.png"
                alt="dp-icon-disabled"
              >
              <img
                class="nav-dp-normal"
                src="../assets/img/ratings/dp_normal.png"
                alt="dp-icon-highlight"
              >
              {{rates.tab[2].comment_score_title}}
            </span>
          </div>
          <div class="labels">
            <app-label
              v-for="(label, key) in rates.labels"
              :key="key"
              :keyPoint="label.content"
              :score="label.label_count"
            />
          </div>
        </div>
        <div class="content-main">
          <app-comment
            v-for="(comment, index) in rates.thisTimeComments"
            :key="index"
            :name="comment.user_name"
            :time="getNormalDate(comment.comment_time)"
            :content="comment.comment"
            :icon="comment.user_pic_url"
            :rate="comment.order_comment_score"
            :isStarShow="true"
            :isRating="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import RatingProfile from "./RatingProfile";
import Label from "./Label";
import Comment from "./Comment";
import getNormalDate from "../utilities/getNormalDate.js";
import { mapMutations, mapState } from "vuex";
import setHeightOfWrapper from "../utilities/setHeightOfWrapper.js";
import type from "../store/type.js";
export default {
  name: "ratings",
  components: {
    "rating-profile": RatingProfile,
    "app-label": Label,
    "app-comment": Comment
  },
  props: {
    dpScore: {
      type: Number,
      default: 0
    },
    labels: {
      type: Array,
      default: () => [
        {
          label_id: 75,
          content: "味道赞",
          label_count: 45,
          label_star: 5
        },
        {
          label_id: 39,
          content: "服务好",
          label_count: 20,
          label_star: 5
        }
      ]
    }
  },
  data: () => ({
    navActiveAll: "nav-active",
    navActiveWithPhoto: "",
    navActiveDp: "",
    isFirstTimeUpdated: true
  }),
  computed: {
    ...mapState(["rates"])
  },
  methods: {
    ...mapMutations([
      type.SHOW_COMMENTS_INCREASE,
      type.SHOW_COMMENTS_WITH_PHOTO,
      type.SHOW_COMMENTS_IS_DP
    ]),
    toggleNavStyle: function(activeClassName) {
      const navActiveClassNames = [
        "navActiveAll",
        "navActiveWithPhoto",
        "navActiveDp"
      ];
      const _this = this;
      navActiveClassNames.forEach(val => {
        if (activeClassName === val) {
          _this[val] = "nav-active";
          return;
        }
        _this[val] = "";
      });
    },
    showComments: function(name) {
      const { commit } = this.$store;
      switch (name) {
        case "all":
          commit({
            type: type.SHOW_COMMENTS_INCREASE
          });
          this.toggleNavStyle("navActiveAll");
          break;
        case "photo":
          commit({
            type: type.SHOW_COMMENTS_WITH_PHOTO
          });
          this.toggleNavStyle("navActiveWithPhoto");
          break;
        case "dp":
          commit({
            type: type.SHOW_COMMENTS_IS_DP
          });
          this.toggleNavStyle("navActiveDp");
          break;
        default:
          break;
      }
    },
    getNormalDate,
    setHeightOfWrapper,
    calTheScollHeightOfRatings: function() {
      const viewportHeight = document.querySelector("html").offsetHeight;
      const navHeight = document.querySelector(".nav").offsetHeight;
      return viewportHeight - navHeight;
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      new BScroll(".ratings-wrapper", {
        click: true,
        tap: true
      });
    });
    const { commit } = this.$store;
    commit({
      type: type.SHOW_COMMENTS_INCREASE
    });
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
.ratings-wrapper {
  position: absolute;
  top: 191px;
  left: 0;
  bottom: -51px;
  right: 0px;
  overflow: hidden;
}
.division {
  height: 10px;
  background-color: #f4f4f4;
}
.header {
  padding: 16px;
}
.nav {
  height: 33px;
  margin-bottom: 11px;
  border: 1px solid #ffb000;
  border-radius: 3px;
  font-size: 0;
}
[class^="nav-"] {
  display: inline-block;
  width: 33.33%;
  font-size: 14px;
  line-height: 33px;
  color: #ffb000;
  text-align: center;
  box-sizing: border-box;
  vertical-align: middle;
}
.nav-dp img {
  width: 14px;
  vertical-align: middle;
}
.nav-all {
  border-right: 1px solid #ffb000;
}
.nav-with-photo {
  border-right: 1px solid #ffb000;
}
.nav-dp {
  border-left: 1px solid #ffb000;
}
.nav-dp-active {
  display: none;
}
.nav-active {
  color: black;
  background-color: #ffb000;
}
.nav-active .nav-dp-normal {
  display: none;
}
.nav-active .nav-dp-active {
  display: inline-block;
}
</style>
