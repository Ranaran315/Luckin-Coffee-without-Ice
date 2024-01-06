// components/form/form-item/index.js
import bus from "../../../utils/bus"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 提示文本
    label: String,
    labelWidth: "",
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

  },

  lifetimes: {
    attached() {
      bus.$on("setStore",store => {
        this.setData({
          labelWidth: store.states.labelWidth
        })
      })
    }
  }
})