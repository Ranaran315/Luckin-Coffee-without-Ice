// pages/login/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否已同意用户协议等
    isChecked: false,
    openid:""
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
  async loginByOneClick() {
    console.log(this.data.openid);
    const user=await db.collection('user').where({_openid:this.data.openid}).get()
    console.log(user);
    if(user.data.length==0){
      db.collection('user').add({
        data: {
          username: "Rikka",
          lucky_day: "",
          phone: "",
          gender: "男",
          avatar: "https://636c-cloud1-5gya1gnp983b86b0-1323577987.tcb.qcloud.la/default_avatar.png?sign=96e5d539144095f5b1c9ad3e9aac9045&t=1704869741",
          addressList: [],
        }
      }).then((res) => {
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          position: 'top', // 设置弹窗位置为页面上部
          duration: 2000 ,// 设置弹窗持续时间为2秒
          top:20
        })
        console.log(res,"11111111111111");
        console.log(user)
      }).catch((err) => {
        console.error('添加数据失败:', err)
      })
      
      
      console.log(user,"3333333333333")
      wx.setStorageSync("userinfo",user.data)
    }
    else{
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        position: 'top', // 设置弹窗位置为页面上部
        duration: 2000 ,// 设置弹窗持续时间为2秒
        top:20
      })
    }
    const userinfo=await db.collection('user').where({_openid:this.data.openid}).get()
    wx.setStorageSync("userinfo",userinfo.data)
    // console.log(user);
    // this.determineIsChecked().then(() => {
    //   wx.navigateTo({
    //     url: '',
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    wx.cloud.callFunction({
      name: 'getOpenid',//上面这个云函数并不需要我们传递参数（也就不需要data属性）
    }).then(res => {
      console.log("云函数返回的结果",res)
      this.setData({
        openid:res.result.openid
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