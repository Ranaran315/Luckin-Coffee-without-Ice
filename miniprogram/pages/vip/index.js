// pages/vip/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipImagesList: [{
        id: 1,
        src: 'cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/vip/image/vipimage0.jpg'
      },
      {
        id: 2,
        src: 'cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/vip/image/vipimage1.jpg'
      },
      {
        id: 3,
        src: 'cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/vip/image/vipimage2.jpg'
      },
      {
        id: 4,
        src: 'cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/vip/image/vipimage3.jpg'
      }
    ]
  },
  onLoad() {

  },
  yhj() {
    wx.showModal({
      title: '兑换会员卡',
      editable: true,
      placeholderText: '请输入兑换码',
      confirmColor: 'blue',
    })
  }
})