// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否已同意用户协议等
    isChecked: false
  },

  // 处理单选框事件
  handlerChange(e) {
    this.setData({
      isChecked: e.detail.value
    })
  },

  // 判断是否勾选 用于协议
  determineIsChecked() {
    return new Promise((resolve, rejected) => {
      if (!this.data.isChecked) {
        wx.showToast({
          title: '请先同意用户协议',
          icon: "none"
        })
        rejected()
      }
      resolve()
    })
  },

  // 手机号安全登录
  loginByPhone() {
    wx.navigateTo({
      url: 'loginByPhone/index',
    })
  },

  // 一键登录
  loginByOneClick() {
    this.determineIsChecked().then(() => {
      wx.navigateTo({
        url: 'url',
      })
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