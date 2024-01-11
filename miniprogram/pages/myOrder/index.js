// pages/myOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      {
        
      }
    ],
    isLoading: false
  },

  getOrderList() {
    const that = this
    that.setData({
      isLoading: true
    })
    wx.cloud.callFunction({
      name: 'getGoods',//上面这个云函数并不需要我们传递参数（也就不需要data属性）
    }).then(res => {
      that.setData({
        isLoading: false
      })
      console.log("云函数返回的结果1",res)
      that.setData({
        orderList:res.result.data.data
      })
    }).catch(err => {
      that.setData({
        isLoading: false
      })
      console.log("云函数",err)
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
    if (wx.getStorageSync('userinfo') == '') {
      wx.navigateTo({
        url: '../login/index',
      })
      return
    }
    this.getOrderList()
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