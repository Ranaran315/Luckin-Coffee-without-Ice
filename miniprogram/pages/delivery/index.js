// pages/chooseAddress/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      
    ],
    // 是否自提
    isSelf: false
  },

  // 更改配送方式
  switchDeliveryType(e) {
    this.setData({
      isSelf: e.detail.value
    })
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
      addressList:user.data[0].addressList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isSelf: options.isSelf == "true" ? true : false
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