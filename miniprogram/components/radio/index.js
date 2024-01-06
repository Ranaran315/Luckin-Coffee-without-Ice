// components/radio/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 单选框的值
    value: {
      type: Boolean,
      value: true
    },
    // 展示的值
    showValue: String,
    // 选中的颜色
    checkedColor: String,
    // 按钮大小
    size: String
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
    change() {
      const newValue = !this.data.valueSync
      this.setData({
        valueSync: newValue
      })
      
      this.triggerEvent("change",{value:newValue})
    }
  },
  observers: {
    "value": function(newVal) {
      this.setData({
        valueSync: newVal
      })
    }
  }
})