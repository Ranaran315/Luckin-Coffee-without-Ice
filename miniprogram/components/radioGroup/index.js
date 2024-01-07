// components/radioGroup/index.js
import "../../utils/bus"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 单选项列表
    options: Array,
    // 如果单选列表中是对象的集合，则该属性指定显示的值
    name: String,
    // 选择的选项
    checked: String,
    // 当传入该属性时：选择的选项匹配规则，例如传入"id"表示匹配单选项列表中的id
    checkedRule: String,
    // 选中的颜色
    checkedColor: String,
    // 按钮大小
    size: String,
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
    handlerChange(e) {
      let checked = ""
      if (e.detail.value) {
        checked = e.currentTarget.dataset.item[this.data.checkedRule]
      }
      this.setData({
        checked: checked
      })
      this.triggerEvent("change",{checked:checked})
    }
  },
})