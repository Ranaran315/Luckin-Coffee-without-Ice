// pages/order/index.js

import {getCurrentTime} from "../../utils/timeFormat"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部样式
    headerStyle: "",
    // 主体样式
    mainStyle: "",
    // 门店信息
    store: "",
    // 地址信息
    address: "",
    // 是否为自提，true为自提，false为外送
    isSelf: true,
    // 分类信息
    categoryList: [],
    // 当前所选中的分类索引
    currentCategoryIndex: 0,
    // 用于scroll-into-view
    currentCategoryId: 0,
    // 是否为手动滑动
    isManualScroll: true,
    // 咖啡列表
    dataList: [],
    // 减免
    preferential: 0,
    // 购物车动画
    cartIsShowing: false,
    // 购物车
    cart: {},
    // 购物车中商品的数量
    cartNumber: 0,
    // 总价
    totalPrice: 0,
    // 控制展示购物车详细信息
    cartDetailInfoVisiablity: false       
  },

  // 选择配送方式
  selectDeliveryType(e) {
    const value = e.detail.value
    this.setData({
      isSelf: value
    })
    wx.navigateTo({
      url: '/pages/delivery/index?isSelf=' + value,
    })
  },

  // 选择分类
  selectCategory(e) {
    this.setData({
      currentCategoryId: e.currentTarget.dataset.id,
      currentCategoryIndex: e.currentTarget.dataset.index,
      isManualScroll: false, // 注意设置此时不是手动滚动
    })
    // 当点击完后设置手动滚动
    setTimeout(() => {
      this.setData({
        isManualScroll: true
      })
    }, 10)
  },

  // 处理右边的滚动
  handlerRightScroll(e) {
    const query = wx.createSelectorQuery()
    query.select("#coffee-scroll-view").boundingClientRect()
    query.selectAll(".right-item .header").boundingClientRect()
    if (this.data.isManualScroll) {
      query.exec(res => {
        const scrollViewTop = res[0].top
        res[1].forEach((item, index) => {
          if (item.top < scrollViewTop + 50 && item.bottom > scrollViewTop) {
            this.setData({
              currentCategoryIndex: index,
            })
          }
        })
      })
    }
  },

  // 选择咖啡
  checkCoffee(e) {
    // console.log(e)
    wx.navigateTo({
      url: `../coffeeDetail/index?id=${e.currentTarget.dataset.id}`,
    })
  },

  // 展示购物车
  showCart() {
    const newValue = !this.data.cartIsShowing
    this.setData({
      cartIsShowing: newValue
    })
  },

  // 计算购物车中商品的总数量
  computedCartNumber() {
    const cart = this.data.cart
    let number = 0;
    if (Array.isArray(cart)) {
      cart.forEach(item => {
        number += item.number
      })
    }
    
    this.setData({
      cartNumber: number
    })
  },

  // 计算购物车中商品的总价格
  computedCartPrice() {
    const cart = this.data.cart
    let totalPrice = 0
    if (Array.isArray(cart)) {
      cart.forEach(item => {
        totalPrice += item.number * item.price_sale
      })
    }

    this.setData({
      totalPrice: totalPrice
    })
  },

  // 改变是否展示购物车详细信息
  changeCartDetailInfoVisiablity() {
    this.setData({
      cartDetailInfoVisiablity: !this.data.cartDetailInfoVisiablity
    })
  },

  // 清空购物车
  clearAllCart() {
    wx.showModal({
      title: '',
      content: '确定不要了吗',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.removeStorageSync('cart')
          this.setData({
            cart: {}
          })
          this.computedCartNumber()
          this.computedCartPrice()
          this.changeCartDetailInfoVisiablity()
        }
      }
    })
    
  },

  // 从购物车中删除商品
  removeGoodFromCart(e) {
    let good = e.currentTarget.dataset.item
    let cart = this.data.cart
    let meta = ""
    good.sku.metaList.forEach(item => {
      meta += `/${item.value.name}`
    })

    const _this = this

    wx.showModal({
      title: '',
      content: `是否要删除"${good.name}${meta}"`,
      complete: (res) => {
        if (res.cancel) {
          return
        }
    
        if (res.confirm) {
          cart.forEach((item,index) => {
            if (item.sku.id == good.sku.id) {
              cart.splice(index,1)
              return
            }
          })
          wx.setStorageSync('cart', cart)
          _this.setData({
            cart: cart
          })
          _this.computedCartNumber()
          _this.computedCartPrice()
        }
      }
    })
    
    
  },

  // 处理购物车中数量的改变
  handlerChangeGoodsNumber(e) {
    let number = e.detail.value // 获取numbercount传过来的数据
    let good = e.currentTarget.dataset.item // 获取sku商品信息
    good.number = number // 改变购物车中对应sku商品的数量
    // 改变本地存储
    let cart = this.data.cart
    cart = cart.map(item => item.sku.id == good.sku.id ? good : item)
    wx.setStorageSync('cart', cart)
    cart = wx.getStorageSync('cart')
    this.setData({
      cart:cart
    })
    this.computedCartNumber()
    this.computedCartPrice()
  },

  // 去结算
  settlement() {
    let paramStr = JSON.stringify(this.data.cart)
    let time = getCurrentTime()
    wx.navigateTo({
      url: `../order/index?goods=${encodeURIComponent(paramStr)}&time=${time}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 动态设置导航栏的位置
    const {
      top,
      height
    } = wx.getMenuButtonBoundingClientRect();
    let centerPosition = top + height / 2;
    let headerStyle = "margin-top: calc(" + centerPosition + "px - 30rpx)" // 这个30rpxheader的高度的一半 
    this.setData({
      headerStyle: headerStyle
    })

    // 动态设置菜单的高度
    const query = wx.createSelectorQuery()
    query.select(".container > .header").boundingClientRect();
    query.select(".container > .center").boundingClientRect()
    query.exec(res => {
      let headerHeight = res[0].height
      let centerHeight = res[0].height
      let mainStyle = "height: calc(100% - " +
        headerHeight + "px" +
        " - " +
        centerPosition + "px" +
        "- 30rpx - 15rpx - " +
        centerHeight + "px" +
        "- 30rpx"

      this.setData({
        mainStyle: mainStyle
      })
    })

    //云函数getCategoryList()获取categoryList
    wx.cloud.callFunction({
      name:"getCategoryList",
    }).then(res=>{
     
      this.setData({
        categoryList:res.result
      })
      //console.log(this.data.categoryList)
    })
    //云函数getDataSpu()获取
    wx.cloud.callFunction({
      name:"getDataSpu",
    }).then(res =>{
      this.setData({
        dataList: res.result
      })
      // console.log(this.data.dataList)
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
    this.setData({
      address: wx.getStorageSync('address'),
      store: wx.getStorageSync('store'),
      cart: wx.getStorageSync("cart")
    })
    // 计算购物车商品中的数量
    this.computedCartNumber()
    // 计算价格
    this.computedCartPrice()
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