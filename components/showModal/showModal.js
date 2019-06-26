// components/showModal/showModal.js
let http =require('../../utils/wxhttp.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    container: {
      type: Object
    }
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
    operation(e) {
      console.log(e);
      let options = { confirm: true,even:e}
      if (e.currentTarget.dataset.type == 0) options.confirm = false
       this.triggerEvent("operation", options)
      // console.log(e)
    },
    getPhoneNumber(e) {
      this.operation(e);
    }
  }
})
