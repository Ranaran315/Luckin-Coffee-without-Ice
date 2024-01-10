// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    wx.cloud.callFunction({
      name: 'getLbt',//上面这个云函数并不需要我们传递参数（也就不需要data属性）
    }).then(res => {
      console.log("云函数返回的结果",res)
      this.setData({
        swiperList:res.result.lbt.data
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