// pages/order/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 门店信息
    store: wx.getStorageSync('store'),
    // 地址信息
    address: wx.getStorageSync('address'),
    // 是否为自提，true为自提，false为外送
    isSelf: true,
    // 分类信息
    categoryList: [{
        id: 1,
        name: "人气Top"
      },
      {
        id: 2,
        name: "爆款套餐"
      },
      {
        id: 3,
        name: "新年第一杯"
      },
      {
        id: 4,
        name: "酱香拿铁"
      },
      {
        id: 5,
        name: "生椰拿铁"
      },
      {
        id: 6,
        name: "秋冬暖咖"
      },
      {
        id: 7,
        name: "大师咖啡"
      },
      {
        id: 8,
        name: "美式家族"
      },
      {
        id: 9,
        name: "小黑杯"
      },
      {
        id: 10,
        name: "丝绒拿铁"
      },
      {
        id: 11,
        name: "生酪拿铁"
      }
    ],
    // 当前所选中的分类索引
    currentCategoryIndex: 0,
    // 咖啡列表
    dataList: [{
        id: 1,
        name: "人气Top",
        desc: "瑞幸必喝爆款，无限回购",
        coffeeList: [{
            id: 1,
            name: "烤椰拿铁",
            desc: "易烊千玺同款，冬天喝烤椰",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee01.png",
          },
          {
            id: 2,
            name: "马斯卡彭生酪拿铁",
            desc: "含丹麦芝士，奶味提升24%",
            price_face: 29,
            price_sale: 18,
            coverImg: "../../images/coffee02.png"
          },
          {
            id: 3,
            name: "褚橙拿铁",
            desc: "含当季褚橙果汁*，新年限量供应",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee03.png"
          }
        ]
      },
      {
        id: 2,
        name: "爆款套餐",
        desc: "",
        coffeeList: [{
            id: 1,
            name: "烤椰拿铁",
            desc: "易烊千玺同款，冬天喝烤椰",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee01.png",
          },
          {
            id: 2,
            name: "马斯卡彭生酪拿铁",
            desc: "含丹麦芝士，奶味提升24%",
            price_face: 29,
            price_sale: 18,
            coverImg: "../../images/coffee02.png"
          },
          {
            id: 3,
            name: "褚橙拿铁",
            desc: "含当季褚橙果汁*，新年限量供应",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee03.png"
          }
        ]
      },
      {
        id: 3,
        name: "新年第一杯",
        desc: "开启你的2024年",
        coffeeList: [{
            id: 1,
            name: "烤椰拿铁",
            desc: "易烊千玺同款，冬天喝烤椰",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee01.png",
          },
          {
            id: 2,
            name: "马斯卡彭生酪拿铁",
            desc: "含丹麦芝士，奶味提升24%",
            price_face: 29,
            price_sale: 18,
            coverImg: "../../images/coffee02.png"
          },
          {
            id: 3,
            name: "褚橙拿铁",
            desc: "含当季褚橙果汁*，新年限量供应",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee03.png"
          }
        ]
      }
    ]
  },

  selectDeliveryType(e) {
    const value = e.detail.value
    this.setData({
      isSelf: value
    })
    wx.navigateTo({
      url: '/pages/delivery/index?isSelf=' + value,
    })

  },

  selectCategory(e) {
    this.setData({
      currentCategoryIndex: e.currentTarget.dataset.index
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