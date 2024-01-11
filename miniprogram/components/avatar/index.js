// components/avatar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultAvatar: "cloud://cloud1-5gya1gnp983b86b0.636c-cloud1-5gya1gnp983b86b0-1323577987/default_avatar.png",
    avatarSrc: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },

  observers: {
    "src": function(newVal) {
      const _this = this
      const imgSrc = newVal
      const defaultAvatar = _this.data.defaultAvatar
      // 如果传入的为空字符串
      if (newVal.trim() == "") {
        _this.setData({
          avatarSrc: defaultAvatar
        })
      }
      // 判断图片是否成功加载
       wx.getImageInfo({
        src: imgSrc,
        success: () => {
          _this.setData({
            avatarSrc: imgSrc
          })
        },
        fail: () => {
          _this.setData({
            avatarSrc: defaultAvatar
          })
        }
      });
    }
  },

  lifetimes: {
    attached() {
      
    }
  }
})