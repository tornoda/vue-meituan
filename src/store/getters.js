export default {
  everyCategorySelectedNum: ({ goods: { foodsDetails } }) => {
    return foodsDetails.map(category => {
      let number = 0;
      category.spus.forEach(item => {
        number += item.counts;
      });
      return number;
    });
  },
  totalCounts: (state, getters) => {
    const num = getters.everyCategorySelectedNum
    // 注意这里初始的foodsDetails是一个空数组，考虑初始getter值，必须处理这种特殊情况
    if (num.length === 0) return 0
    return num.reduce((pre, val) => {
      return pre + val
    })
  },
  selectedItem: ({ goods: { foodsDetails } }) => {
    let selected = []
    if (foodsDetails.length === 0) return selected
    foodsDetails.forEach(category => {
      category.spus.forEach(item => {
        if (item.counts === 0) return false
        const existItemId = item.id
        selected.forEach(existItem => {
          if (existItem.id === existItemId) return false
        })
        selected.push(item)
      })
    })
    return selected
  },
  totalPrice: (state, { selectedItem }) => {
    let total = 0
    selectedItem.forEach(item => {
      total += item.counts * item.min_price
    })
    return total
  },
  promotion: ({ header, header: { discounts2 } }) => {
    if (typeof discounts2 === "undefined") return null
    return discounts2.map(item => {
      return item.info
    })
  }
};