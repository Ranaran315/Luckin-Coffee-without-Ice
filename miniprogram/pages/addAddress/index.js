// pages/addAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      name: "",
      genderId: 1,
      phone: "",
      address: "",
      houseNumber: "",
      tagId: 0,
      isDefault: false
    },
    gender: [
      {
        id: 1,
        name: "先生"
      },
      {
        id: 2,
        name: "女士"
      }
    ],
    tagList: [
      {
        id: 1,
        name: "公司"
      },
      {
        id: 2,
        name: "家"
      },
      {
        id: 3,
        name: "学校"
      }
    ],
  },

  // 处理输入框事件
  handlerInput(e) {
    const id = e.currentTarget.dataset.id
    const value = e.detail.value
    this.setData({
      [`address.${id}`]: value
    })
  },

  // 选择标签
  chooseTag(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      "address.tagId": e.currentTarget.dataset.id
    })
  },

  // 选择是否为默认地址
  changeIsDefault(e) {
    this.setData({
      "address.isDefault": e.detail.value
    })
  },

  // 选择收货地址
  chooseAddress() {
    wx.chooseLocation({
      success: function (res) {
        wx.showToast({
          title: '获取成功',
          icon: 'none',
          duration:  1000
        })
        console.log(res); // 拿到地址
      },
      fail: function () {
        wx.showToast({
          title: '获取失败, 请确定您的设备情况',
          icon: 'none',
          duration: 1000
        })
      },
      complete: function () {
      }
    })
  },

  // 选择性别
  chooseGender(e) {
    this.setData({
      "address.genderId": e.detail.checked
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