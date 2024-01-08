// pages/coffeeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 咖啡详情
    coffeeDetail: {
      id: 1,
      bannerList: [{
          id: 1,
          src: "../../images/coffeeDetail02.png",
        },
        {
          id: 2,
          src: "../../images/coffeeDetail01.png"
        },
      ],
      name: "烤椰拿铁",
      metaList: [{
          id: 1,
          name: "杯型",
          value: [{
            id: 1,
            name: "大杯",
            value: ""
          }],
          checkedValueId: 1,
        },
        {
          id: 2,
          name: "温度",
          value: [{
              id: 1,
              name: "冰"
            },
            {
              id: 2,
              name: "热"
            }
          ],
          checkedValueId: 2,
        },
        {
          id: 3,
          name: "糖度",
          value: [{
              id: 1,
              name: "不另外加糖"
            },
            {
              id: 2,
              name: "加糖"
            },
            {
              id: 3,
              name: "标准糖"
            }
          ],
          checkedValueId: 1,
        }
      ],
      detailImage: "../../images/coffeeDetailLongImg01.png",
      rawMaterial: "纯牛奶、马斯卡彭风味厚奶（配置型含乳饮料）、浓缩咖啡"
    },
    goodsNumber: 1,
    reduceNumberLimit: 1,
    addNumberLimit: 50
  },

  // 选择规格
  chooseMetaItem(e) {
    const itemId = e.currentTarget.dataset.itemId
    const metaId = e.currentTarget.dataset.metaId
    const newMetaList = this.data.coffeeDetail.metaList.map(meta => {
      if (meta.id == metaId) {
        return {
          ...meta,
          checkedValueId: itemId
        }
      } else {
        return meta
      }
    })
    this.setData({
      "coffeeDetail.metaList": newMetaList
    })
  },

  // 处理改变选择商品的数量
  handlerChangeGoodsNumber(e) {
    this.setData({
      goodsNumber: e.detail.value
    })
  },

  // 减少商品数量失败的回调
  reduceGoodsNumberFail() {
    wx.showToast({
      title: '商品数量不能小于1',
      icon: "none"
    })
  },

  addGoodsNumberFail() {
    wx.showModal({
      title: '',
      content: '购物车一次最多可选50件，可以分多次下单哦',
      confirmText: "我知道了",
      showCancel: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})