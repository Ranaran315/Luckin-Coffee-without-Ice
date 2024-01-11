// pages/vip/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipImagesList: [
      {
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
    ]
  },
  onLoad(){
 
  },
  yhj(){
  wx.showModal({
    title:'兑换会员卡',
    editable:true,
    placeholderText:'请输入兑换码',
    confirmColor:'blue',
  })
  }
})