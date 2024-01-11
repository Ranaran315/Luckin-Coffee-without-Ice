// pages/vip/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: [{
        id: 1,
        title: "30天连续包月",
        price_sale: 9.90,
        price_face: 19.90
      },
      {
        id: 2,
        title: "30天单月",
        price_sale: 15.90,
        price_face: 19.90
      },
    ],
    vipImagesList: [{
        id: 1,
        src: '../../images/vipimage0.jpg'
      },
      {
        id: 2,
        src: '../../images/vipimage1.jpg'
      },
      {
        id: 3,
        src: '../../images/vipimage2.jpg'
      },
      {
        id: 4,
        src: '../../images/vipimage3.jpg'
      }
    ],
    currentVipId: 1
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
  },
  changeVip(e) {
    this.setData({
      currentVipId: e.currentTarget.dataset.item.id
    })
  }
})