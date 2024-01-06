// components/form/index.js
import Store from "./src/store"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // label宽度
    "labelWidth": String
  },

  /**
   * 组件的初始数据
   */
  data: {
    store: null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  observers: {
    "labelWidth": function(newVal) {
      const store = this.data.store
      store.dispatch("setLabelWidth",newVal)
    }
  },

  lifetimes: {
    created() {
      this.setData({
        store: new Store()
      })
    }
  }
})