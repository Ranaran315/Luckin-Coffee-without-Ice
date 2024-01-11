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

  async getaddress(){
    const userinfo =wx.getStorageSync('userinfo')
    const user=await db.collection('user').where({
      _openid:userinfo[0]._openid
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

  // 修改地址
  updateAddress(e) {
    const address = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index
    const paramStr = JSON.stringify(address)
    wx.navigateTo({
      url: `../updateAddress/index?address=${encodeURIComponent(paramStr)}&index=${index}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStore()
    this.setData({
      isSelf: options.isSelf == "true" ? true : false
    })
    this.getLocation()
    
  },
  getStore(){
    console.log(1111111111111111111111111111111111111111)
    const that = this
    wx.cloud.callFunction({
      name: 'getStore',//上面这个云函数并不需要我们传递参数（也就不需要data属性）
    }).then(res => {
      console.log("云函数返回的结果",res)
      this.setData({
        storeList:res.result.store.data
      })
      that.setData({
        result:res.result
      })
    }).catch(err => {
      console.log("云函数",err)
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
    this.getaddress()
    const userInfoList = wx.getStorageSync('userinfo')
    if (userInfoList == '') {
      wx.navigateTo({
        url: '../login/index',
      })
    }
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