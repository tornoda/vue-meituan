import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const type = {
  // 保存state
  SAVE_HEAD: "SAVE_HEAD",
  SAVE_GOODS: "SAVE_GOODS",
  SAVE_RATES: "RATES",
  SAVE_SELLER: "SELLER",

  // 获取数据
  FETCH_HEAD_AND_GOODS: "FETCH_HEAD_AND_GOODS",
  FETCH_RATES: "FETCH_RATES",
  FETCH_SELLER: "FETCH_SELLER",
};
const state = {
  header: {},
  goods: {},
  rates: {},
  seller: {}
};
const getter = {

};
const mutation = {
  [type.SAVE_HEAD]: (state, payload) => {
    state.header = payload
  },
  [type.SAVE_GOODS]: (state, payload) => {
    state.goods = payload
  }
};
const action = {
  [type.FETCH_HEAD_AND_GOODS]: function ({ state, commit }) {
    axios.get("http://localhost:8080/mockdata/goods.json")
      .then(({ data }) => {
        const { poi_info, container_operation_source, food_spu_tags } = data
        commit({
          type: type.SAVE_HEAD,
          payload: poi_info
        });
        commit({
          type: type.SAVE_GOODS,
          ...container_operation_source,
          ...food_spu_tags
        })

      })
  }
}

export default new Vuex.Store({
  state,
  getter,
  mutation,
  action
})