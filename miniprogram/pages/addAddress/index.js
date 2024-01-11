// pages/addAddress/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    address: {
      name: "",
      genderId: 1,
      phone: "",
      address: "",
      houseNumber: "",
      tag: {},
      isDefault: false
    },
    gender: [{
        id: 1,
        name: "先生"
      },
      {
        id: 2,
        name: "女士"
      }
    ],
    tagList: [{
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
    isLoading: false
  },

  // 处理输入框事件
  handlerInput(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id
    const value = e.detail.value
    this.setData({
      [`address.${id}`]: value
    })
  },

  // 选择标签
  chooseTag(e) {
    this.setData({
      "address.tag": e.currentTarget.dataset.item
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
    const _this = this
    wx.chooseLocation({
      success: function (res) {
        wx.showToast({
          title: '获取成功',
          icon: 'none',
          duration: 1000
        })
        _this.setData({
          "address.address": res.address
        }); // 拿到地址
      },
      fail: function () {
        wx.showToast({
          title: '获取失败, 请确定您的设备情况',
          icon: 'none',
          duration: 1000
        })
      },
      complete: function () {}
    })
  },

  // 选择性别
  chooseGender(e) {
    this.setData({
      "address.genderId": e.detail.checked
    })
  },

  // 从微信导入地址
  importAddressFromWx() {
    const _this = this
    wx.chooseAddress({
      success: res => {
        const {
          userName,
          telNumber,
          provinceName,
          countyName,
          cityName,
          detailInfo
        } = res
        _this.setData({
          "address.name": userName,
          "address.phone": telNumber,
          "address.address": `${provinceName}${cityName}${countyName}`,
          "address.houseNumber": detailInfo
        })
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: '获取用户地址失败',
          icon: 'none'
        })
      }
    })
  },

  // 保存
  async save() {
    this.setData({
      isLoading: true
    })
    // TODO：保存新增地址
    const userinfo = wx.getStorageSync("userinfo")
    // 在页面中调用云数据库API
    const db = wx.cloud.database()
    //获取所以address数据
    const user=await db.collection('user').where({_openid:userinfo[0]._openid}).get()
    if(!user.data[0].addressList)user.addressList=[]
    console.log(this.data.address.isDefault);
    for (let i of user.data[0].addressList){
      console.log(this.data.address.isDefault);
      if(this.data.address.isDefault){
        
        i.isDefault=false
      }
      console.log(i)
      this.data.addressList.push(i)
    }
    this.data.addressList.push(this.data.address)
    await db.collection('user').where({
      _openid:userinfo[0]._openid
    }).update({
      data: {
        addressList:this.data.addressList
      },
      success: res => {
        wx.showToast({
          title: '添加成功',
          icon: "none"
        })
      },
      fail: err => {
        wx.showToast({
          title: '失败',
          icon: "none"
        })
      }
    })
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
      wx.navigateBack()
    },500)
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