// components/switchTab/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 切换按钮的布尔值
    value: {
      type: Boolean,
      value: true
    },
    // 按钮左边的文字
    leftText: {
      type: String,
      value: "左边"
    },
    rightText: {
      type: String,
      value: "右边"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueSync: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const newValue = e.currentTarget.dataset.flag
      this.setData({
        valueSync: newValue
      }),
      this.triggerEvent("change",{value: newValue})
    }
  },

  observers: {
    "value": function (newVal) {
      this.setData({
        valueSync: newVal
      })
    }
  }
})