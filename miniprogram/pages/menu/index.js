// pages/order/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部样式
    headerStyle: "",
    // 主体样式
    mainStyle: "",
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
    // 用于scroll-into-view
    currentCategoryId: 0,
    // 是否为手动滑动
    isManualScroll: true,
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
      },
      {
        id: 4,
        name: "酱香拿铁",
        desc: "",
        coffeeList: [{
            id: 1,
            name: "烤椰拿铁",
            desc: "易烊千玺同款，冬天喝烤椰",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee01.png",
          },
        ]
      },
      {
        id: 5,
        name: "生椰拿铁",
        desc: "",
        coffeeList: [{
            id: 1,
            name: "烤椰拿铁",
            desc: "易烊千玺同款，冬天喝烤椰",
            price_face: 32,
            price_sale: 19,
            coverImg: "../../images/coffee01.png",
          },
        ]
      },
      {
        id: 6,
        name: "秋冬暖咖",
        desc: "在这么冷的天来一杯暖咖",
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
    ],
  },

  // 选择配送方式
  selectDeliveryType(e) {
    const value = e.detail.value
    this.setData({
      isSelf: value
    })
    wx.navigateTo({
      url: '/pages/delivery/index?isSelf=' + value,
    })
  },

  // 选择分类
  selectCategory(e) {
    this.setData({
      currentCategoryId: e.currentTarget.dataset.id,
      currentCategoryIndex: e.currentTarget.dataset.index,
      isManualScroll: false, // 注意设置此时不是手动滚动
    })
    // 当点击完后设置手动滚动
    setTimeout(() => {
      this.setData({
        isManualScroll: true
      })
    }, 10)
  },

  // 处理右边的滚动
  handlerRightScroll(e) {
    const query = wx.createSelectorQuery()
    query.select("#coffee-scroll-view").boundingClientRect()
    query.selectAll(".right-item .header").boundingClientRect()
    if (this.data.isManualScroll) {
      query.exec(res => {
        const scrollViewTop = res[0].top
        res[1].forEach((item, index) => {
          if (item.top < scrollViewTop + 50 && item.bottom > scrollViewTop) {
            this.setData({
              currentCategoryIndex: index,
            })
          }
        })
      })
    }
  },

  checkCoffee(e) {
    wx.navigateTo({
      url: `../coffeeDetail/index?id=${e.currentTarget.dataset.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      top,
      height
    } = wx.getMenuButtonBoundingClientRect();
    let centerPosition = top + height / 2;
    let headerStyle = "margin-top: calc(" + centerPosition + "px - 30rpx)" // 这个30rpxheader的高度的一半 
    this.setData({
      headerStyle: headerStyle
    })

    const query = wx.createSelectorQuery()
    query.select(".container > .header").boundingClientRect();
    query.select(".container > .center").boundingClientRect()
    query.exec(res => {
      let headerHeight = res[0].height
      let centerHeight = res[0].height
      let mainStyle = "height: calc(100% - " +
        headerHeight + "px" +
        " - " +
        centerPosition + "px" +
        "- 30rpx - 15rpx - " +
        centerHeight + "px" +
        "- 30rpx"

      this.setData({
        mainStyle: mainStyle
      })
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
    this.setData({
      address: wx.getStorageSync('address')
    })
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