// pages/coffeeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情
    spu:{
      bannerList:[],
      skuList:[],
      metaList:[]

    },
    options:{
      id:""
    },
    // 计算后的商品价格
    priceComputed: 0,
    // 商品数量
    goodsNumber: 1,
    reduceNumberLimit: 1,
    addNumberLimit: 50
  },

  // 选择规格
  chooseMetaItem(e) {
    const itemId = e.currentTarget.dataset.itemId
    const metaId = e.currentTarget.dataset.metaId
    const newMetaList = this.data.spu.metaList.map(meta => {
      if (meta.id == metaId) {
        let newCheckedValue = meta.checkedValue
        meta.value.forEach(item => {
          if (item.id == itemId) {
            newCheckedValue = item
          }
        })
        return {
          ...meta,
          checkedValue: newCheckedValue
        }
      } else {
        return meta
      }
    })
    this.setData({
      "spu.metaList": newMetaList
    })
    this.computedPrice()
  },

  // 处理改变选择商品的数量
  handlerChangeGoodsNumber(e) {
    this.setData({
      goodsNumber: e.detail.value
    })
  },

  // 减少商品数量失败时的回调
  reduceGoodsNumberFail() {
    wx.showToast({
      title: '商品数量不能小于1',
      icon: "none"
    })
  },

  // 增加商品数量失败时的回调
  addGoodsNumberFail() {
    wx.showModal({
      title: '',
      content: '购物车一次最多可选50件，可以分多次下单哦',
      confirmText: "我知道了",
      showCancel: false
    })
  },

  // 计算价格
  computedPrice() {
    const spu = this.data.spu
    const meta = spu.metaList
    let metaPrice = 0
    for (let item of meta) {
      if (item) {
        metaPrice += item.checkedValue.price
      }
    }
    this.setData({
      priceComputed: metaPrice + spu.price_sale
    })
  },

  // 加入购物车
  addCart() {
    // 获取spu商品名称，封面图
    const {
      name,
      coverImageUrl
    } = this.data.spu
    // 查找SKU
    let sku
    for (let sku_1 of this.data.spu.skuList) {
      // 所有条件是否满足的表示
      let match = true
      skuMeta: for (let skuMeta of sku_1.metaList) {
        for (let spuMeta of this.data.spu.metaList) {
          if (skuMeta.id == spuMeta.id) {
            if (skuMeta.value.id != spuMeta.checkedValue.id) {
              match = false
              break skuMeta;
            }
          }
        }
      }
      if (match) {
        sku = sku_1
      }
    }
    // 获取本地存取的购物车商品
    const cart = wx.getStorageSync('cart')
    // 判断购物车中是否已添加该sku商品，若添加了，则商品数量增加
    let isExisted = false
    for (let c of cart) {
      if (c.sku.id == sku.id) {
        c.number += this.data.goodsNumber
        isExisted = true
      }
    }

    // 存入本地存储
    if (isExisted) {
      wx.setStorageSync('cart', cart)
    } else {
      const newCart = [
        ...cart,
        {
          sku,
          name,
          coverImageUrl,
          price_sale: this.data.priceComputed,
          number: this.data.goodsNumber
        }
      ]
      wx.setStorageSync('cart', newCart)
    }

    wx.showToast({
      title: '加入购物车成功',
      icon: "none"
    })

    setTimeout(() => {
      wx.navigateBack()
    },500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // TODO 根据id获取详情数据 options.id
    this.setData({
      options:options
    })
    wx.cloud.callFunction({
      name:"getCoffeeDetail",
      data:{
        id:parseInt(options.id)
      }
    }).then(res=>{
      // console.log(res.result)
      this.setData({
        spu:res.result
      })
      this.computedPrice()
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
    // wx.cloud.callFunction({
    //   name:"getCoffeeDetail",
    //   data:{
    //     id:parseInt(this.options.id)
    //   }
    // }).then(res=>{
    //   // console.log(res.result)
    //   this.setData({
    //     spu:res.result
    //   })
    //   this.computedPrice()
    // })
    

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