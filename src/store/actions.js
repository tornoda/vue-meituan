import axios from "axios";
import type from "./type.js";

export default {
  [type.FETCH_HEAD_AND_GOODS]: function ({ commit }) {
    axios.get("/mockdata/goods.json")
      .then(({ data: { data } }) => {
        const { poi_info, container_operation_source, food_spu_tags } = data
        const types = [];
        const specials = container_operation_source;
        const foodsDetails = food_spu_tags
        types.push({
          name: container_operation_source.tag_name,
          icon: container_operation_source.tag_icon,
        })
        food_spu_tags.forEach((element, categoryIndex) => {
          types.push({
            name: element.name,
            icon: element.icon || ""
          });
          element.spus.forEach((item, itemIndex) => {
            item.counts = 0;
            item.categoryIndex = categoryIndex;
            item.itemIndex = itemIndex
          })
        });
        commit({
          type: type.SAVE_HEAD,
          payload: poi_info
        });
        commit({
          type: type.SAVE_GOODS,
          payload: {
            types,
            specials,
            foodsDetails
          }
        })
      })
  },
  [type.FETCH_SELLER]: function ({ commit }) {
    axios.get("/mockdata/seller.json")
      .then(({ data: { data } }) => {
        commit({
          type: type.SAVE_SELLER,
          payload: data
        })
      })
      .catch(err => {
        throw err
      })
  },
  [type.FETCH_RATES]: function ({ commit }) {
    axios.get("/mockdata/ratings.json")
      .then(({ data: { data } }) => {
        commit({
          type: type.SAVE_RATES,
          payload: data
        });
        commit({
          type: type.SORT_COMMENTS_INCREASE,
          payload: data.comments
        })
      })
      .catch(err => {
        throw err
      })
  }
}