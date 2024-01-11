// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    backgroundImage: "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/header_bg.png",
    bannerList: [
      {
        id: 1,
        src: "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/CtwiPGVj5kyABrQZAAJIfoE5CU073.png"
      },
      {
        id: 2,
        src: "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/CtwiPGWRSYeANkR5AAG_Fqf8qT885.png"
      }
    ]
  },

  // 登录
  login() {
    wx.navigateTo({
      url: '../login/index',
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
    const userInfoList = wx.getStorageSync('userinfo')
    this.setData({
      userInfo: userInfoList == '' ? '' : userInfoList[0]
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