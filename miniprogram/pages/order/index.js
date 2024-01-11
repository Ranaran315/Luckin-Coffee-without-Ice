// pages/order/index.js
const db = wx.cloud.database()
import {
  getCureentDetailTime
} from "../../utils/timeFormat"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 预计时间
    estimatedTime: "",
    //支付时间
    zhifutime: "",
    // 配送方式：是否自提
    isSelf: true,
    // 门店信息
    store: {},
    // 地址信息
    address: {},
    // 订单商品信息
    goods: [],
    // 应付价格
    computedPrice: 0,
    // 订单备注展示
    notesBoxDialogVisiablity: false,
    // 订单备注项
    noteMetaList: [{
        id: 1,
        name: "无接触配送",
        value: [{
            id: 1,
            name: "不需要",
          },
          {
            id: 2,
            name: "需要"
          }
        ],
        checkedValueId: 1
      },
      {
        id: 2,
        name: "纸巾",
        value: [{
            id: 1,
            name: "不需要"
          },
          {
            id: 2,
            name: "需要"
          }
        ],
        checkedValueId: 1
      }
    ],
    // 订单备注内容
    note: "",
    computedNote: "",
    // 优惠价格
    preferential: 16,
    isLoading: false
  },

  // 改变配送方式
  changeIsSelf(e) {
    const value = e.detail.value
    this.setData({
      isSelf: value
    })
    wx.navigateTo({
      url: '/pages/delivery/index?isSelf=' + value,
    })
  },
  //支付
  async zhifu() {
    const _this = this
    _this.setData({
      isLoading: true
    })
    console.log(this.data)
    this.data.zhifutime = getCureentDetailTime()
    let number = 0
    this.data.goods.forEach(item => {
      number += item.number
    })
    db.collection('goods').add({
      data: {
        ...this.data,
        number: number
      }
    }).then((res) => {
      _this.setData({
        isLoading: false
      })
      wx.showToast({
        title: '支付成功',
        icon: 'none',
        position: 'top', // 设置弹窗位置为页面上部
        duration: 2000, // 设置弹窗持续时间为2秒
        top: 20
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '../myOrder/index',
        })
      }, 500)
    }).catch((err) => {
      _this.setData({
        isLoading: false
      })
      console.error('添加数据失败:', err)
    })
  },
  // 改变订单弹窗展示
  changeNotesBoxDialog(e) {
    this.setData({
      notesBoxDialogVisiablity: e.currentTarget.dataset.flag
    })
  },

  // 改变订单备注选项
  changeNoteValue(e) {
    const metaId = e.currentTarget.dataset.metaId
    const itemId = e.currentTarget.dataset.itemId
    const newNoteMetaList = this.data.noteMetaList.map(meta => {
      if (metaId == meta.id) {
        meta.checkedValueId = itemId
      }
      return meta
    })
    this.setData({
      noteMetaList: newNoteMetaList
    })
  },

  // 备注输入框的双向绑定
  handlerInputNote(e) {
    this.setData({
      note: e.detail.value
    })
  },

  // 确定订单备注
  confirmNote() {
    let newNote = this.data.note
    this.data.noteMetaList.forEach(meta => {
      meta.value.forEach(item => {
        if (meta.checkedValueId == item.id) {
          newNote += "," + item.name + meta.name
        }
      })
    })
    this.setData({
      computedNote: newNote
    })

    // 关闭弹窗
    this.changeNotesBoxDialog({
      currentTarget: {
        dataset: {
          flag: false
        }
      }
    })
  },

  // 计算价格
  computedPrice() {
    const _this = this
    let price = 0
    _this.data.goods.forEach(item => {
      price += item.price_sale * item.number
    })
    _this.setData({
      computedPrice: price - _this.data.preferential
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置预计时间
    let time = options.time
    let minute = time.substring(3)
    time = time.split('')
    time.splice(3, 2, new Number(minute) + 30 + '')
    this.setData({
      estimatedTime: time.join(''),
      goods: JSON.parse(decodeURIComponent(options.goods))
    })
    // 计算应付价格
    this.computedPrice()
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
    this.setData({
      store: wx.getStorageSync('store'),
      address: wx.getStorageSync('address')
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