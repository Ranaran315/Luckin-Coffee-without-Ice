// pages/order/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 预计时间
    estimatedTime: "",
    // 配送方式：是否自提
    isSelf: true,
    // 门店信息
    store: {},
    // 地址信息
    address: {},
    // 订单商品信息
    goods: [{
      "sku": {
        "id": 6,
        "metaList": [{
          "id": 1,
          "name": "杯型",
          "value": {
            "id": 1,
            "name": "大杯",
            "price": 0
          }
        }, {
          "id": 2,
          "name": "温度",
          "value": {
            "id": 2,
            "name": "热",
            "price": 0
          }
        }, {
          "id": 3,
          "name": "糖度",
          "value": {
            "id": 3,
            "name": "标准糖",
            "price": 0
          }
        }]
      },
      "name": "马斯卡彭生酪拿铁",
      "coverImageUrl": "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/coffee01.png",
      "price_sale": 20,
      "price_face": 32,
      "number": 1
    }, {
      "sku": {
        "id": 1,
        "metaList": [{
          "id": 1,
          "name": "杯型",
          "value": {
            "id": 1,
            "name": "大杯",
            "price": 0
          }
        }, {
          "id": 2,
          "name": "温度",
          "value": {
            "id": 1,
            "name": "冰",
            "price": 0
          }
        }, {
          "id": 3,
          "name": "糖度",
          "value": {
            "id": 1,
            "name": "不另外加糖",
            "price": 0
          }
        }]
      },
      "name": "马斯卡彭生酪拿铁",
      "coverImageUrl": "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/coffee01.png",
      "price_sale": 20,
      "price_face": 32,
      "number": 2
    }],
    // 应付价格
    computedPrice: 0,
    // 订单备注展示
    notesBoxDialogVisiablity: false,
    // 订单备注项
    noteMetaList: [
      {
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
    preferential: 16
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
  async zhifu(){
    console.log(this.data)
    db.collection('goods').add({
      data: {
        goods:this.data.goods
      }
    }).then((res) => {
      wx.showToast({
        title: '支付成功',
        icon: 'none',
        position: 'top', // 设置弹窗位置为页面上部
        duration: 2000 ,// 设置弹窗持续时间为2秒
        top:20
      })
      console.log(res,"11111111111111");
    }).catch((err) => {
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
    this.changeNotesBoxDialog({currentTarget: {dataset: {flag: false}}})
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
    time.splice(3,2,new Number(minute) + 30 + '')
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