// pages/chooseAddress/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否自提
    isSelf: false,
    addressList: [

    ],
    storeList: [
      {
        id: 1,
        name: "宜宾市APM广场店",
        detailAddress: "四川省宜宾市临港区化工路265号，临港中央临港中央8栋1层103号商铺",
        businessHours: "08:30-21:30"
      },
      {
        id: 2,
        name: "宜宾市APM广场店",
        detailAddress: "四川省宜宾市临港区化工路265号，临港中央临港中央8栋1层103号商铺",
        businessHours: "08:30-21:30"
      },
      {
        id: 3,
        name: "宜宾市APM广场店",
        detailAddress: "四川省宜宾市临港区化工路265号，临港中央临港中央8栋1层103号商铺",
        businessHours: "08:30-21:30"
      },
      {
        id: 4,
        name: "宜宾市APM广场店",
        detailAddress: "四川省宜宾市临港区化工路265号，临港中央临港中央8栋1层103号商铺",
        businessHours: "08:30-21:30"
      },
    ],
    // 当前选中的门店索引
    currentStoreIndex: 0
  },

  // 更改配送方式
  switchDeliveryType(e) {
    this.setData({
      isSelf: e.detail.value
    })
    this.getLocation()
  },

  // 选择收货地址
  chooseAddress(e) {
    wx.setStorageSync('address', e.currentTarget.dataset.item)
    wx.navigateBack()
  },

  // 获取地址
  async getaddress() {
    const userinfo = wx.getStorageSync('userinfo')
    const user = await db.collection('user').where({
      _openid: userinfo._openid
    }).get()
    this.setData({
      addressList: user.data[0].addressList
    })
  },

  // 获取定位
  getLocation() {
    if (this.data.isSelf) {
      const key = '4KVBZ-RBAWH-JLTDD-WNHX6-SXPEE-RZBTK'; // 使用在腾讯位置服务申请的key
      const referer = 'luckin-coffee'; // 调用插件的app的名称
      const hotCitys = ''; // 用户自定义的的热门城市

      wx.navigateTo({
        url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
      })
    }
  },

  // 选择门店
  chooseStore(e) {
    wx.setStorageSync('store', e.currentTarget.dataset.item)
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isSelf: options.isSelf == "true" ? true : false
    })
    this.getLocation()
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
    this.getaddress()
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