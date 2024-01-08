// components/numberCount/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 1
    },
    // 增加的最大值
    addLimit: {
      type: Number,
      value: 50
    },
    // 减少的最小值
    reduceLimit: {
      type: Number,
      value: 1
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeValue(newValue) {
      this.setData({
        value: newValue
      })
      this.triggerEvent("change",{value: newValue})
    },
    reduceNumber() {
      let newValue = this.data.value - 1;
      if (newValue < this.data.reduceLimit) {
        this.triggerEvent("reduceFail")
        return
      }
      this.changeValue(newValue)
    },
    addNumber() {
      let newValue = this.data.value + 1;
      if (newValue > this.data.addLimit) {
        this.triggerEvent("addFail")
        return
      }
      this.changeValue(newValue)
    }
  }
})