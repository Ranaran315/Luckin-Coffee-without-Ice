// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 预计时间
    estimatedTime: "14:30",
    // 配送方式：是否自提
    isSelf: true,
    // 门店信息
    store: {},
    // 地址信息
    address: {},
    // 订单商品信息
    goods: [{
      "sku": {
        "id": 6,
        "metaList": [{
          "id": 1,
          "name": "杯型",
          "value": {
            "id": 1,
            "name": "大杯",
            "price": 0
          }
        }, {
          "id": 2,
          "name": "温度",
          "value": {
            "id": 2,
            "name": "热",
            "price": 0
          }
        }, {
          "id": 3,
          "name": "糖度",
          "value": {
            "id": 3,
            "name": "标准糖",
            "price": 0
          }
        }]
      },
      "name": "马斯卡彭生酪拿铁",
      "coverImageUrl": "../../images/coffee01.png",
      "price_sale": 20,
      "price_face": 32,
      "number": 1
    }, {
      "sku": {
        "id": 1,
        "metaList": [{
          "id": 1,
          "name": "杯型",
          "value": {
            "id": 1,
            "name": "大杯",
            "price": 0
          }
        }, {
          "id": 2,
          "name": "温度",
          "value": {
            "id": 1,
            "name": "冰",
            "price": 0
          }
        }, {
          "id": 3,
          "name": "糖度",
          "value": {
            "id": 1,
            "name": "不另外加糖",
            "price": 0
          }
        }]
      },
      "name": "马斯卡彭生酪拿铁",
      "coverImageUrl": "../../images/coffee01.png",
      "price_sale": 20,
      "price_face": 32,
      "number": 2
    }]
  },

  // 改变配送方式
  changeIsSelf(e) {
    this.setData({
      isSelf: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      store: wx.getStorageSync('store'),
      address: wx.getStorageSync('address')
    })
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