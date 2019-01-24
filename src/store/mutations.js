import type from "./type.js";

export default {
  [type.TOGGLE_DETAILS]: (state, { payload: { toggleType } }) => {
    switch (toggleType) {
      case "SHOW":
        state.isDetailsShow = true
        break;
      case "HIDE":
        state.isDetailsShow = false
      default:
        break;
    }
  },
  [type.TOGGLE_SHOP_CARTS]: (state, { payload: { type } }) => {
    switch (type) {
      case "HIDE":
        state.isShopCartsShow = false
        break;
      case "SHOW":
        state.isShopCartsShow = true
      default:
        break;
    }
  },
  [type.CHANGE_MOVING_DIRECTION_Y]: ({ movingStatus }, { payload: { direction, goodsY } }) => {
    movingStatus.movingDirectionY = direction;
    movingStatus.goodsY = goodsY
  },
  [type.SAVE_HEAD]: (state, { payload }) => {
    state.header = payload
  },
  [type.SAVE_GOODS]: (state, { payload }) => {
    state.goods = { ...state.goods, ...payload }
  },
  [type.SAVE_SELLER]: (state, { payload }) => {
    state.seller = payload
  },
  [type.SAVE_RATES]: (state, { payload }) => {
    state.rates = payload
  },
  [type.ADD_ITEM]: (state, { payload: { categoryIndex, itemIndex } }) => {
    state.goods.foodsDetails[categoryIndex]["spus"][itemIndex]["counts"]++
  },
  [type.DELETE_ITEM]: (state, { payload: { categoryIndex, itemIndex } }) => {
    state.goods.foodsDetails[categoryIndex]["spus"][itemIndex]["counts"]--
  },
  [type.CLEAR_SHOP_CART]: state => {
    const allFoods = state.goods.foodsDetails
    allFoods.forEach(category => {
      category.spus.forEach(item => {
        item.counts = 0
      })
    })
  },
  [type.SHOW_DETAILS]: (state, { payload: { categoryIndex, itemIndex } }) => {
    state.details = state.goods.foodsDetails[categoryIndex]["spus"][itemIndex]
  },
  //评论切换
  [type.SORT_COMMENTS_INCREASE]: (state, { payload }) => {
    const sortedComments = payload.sort((a, b) => {
      return (a.comment_time - b.comment_time)
    })
    state.rates.thisTimeComments = sortedComments
  },
  [type.SHOW_COMMENTS_INCREASE]: ({ rates, rates: { comments } }) => {
    if (comments === undefined) return;
    rates.thisTimeComments = comments.sort((a, b) => {
      return (a.comment_time - b.comment_time)
    })
  },
  [type.SHOW_COMMENTS_WITH_PHOTO]: ({ rates, rates: { comments } }) => {
    let commentsWithPhoto = comments.filter(val => {
      return val.comment_pics.length !== 0
    })
    rates.thisTimeComments = commentsWithPhoto.sort((a, b) => {
      return (a.comment_time - b.comment_time)
    })
  },
  [type.SHOW_COMMENTS_IS_DP]: ({ rates, rates: { comments } }) => {
    let commentsIsDp = comments.filter(val => {
      return val.is_dp !== 0
    })
    rates.thisTimeComments = commentsIsDp.sort((a, b) => {
      return (a.comment_time - b.comment_time)
    })
  }
};