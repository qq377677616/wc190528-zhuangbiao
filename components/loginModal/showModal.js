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
    cancelBtn(e) {
      console.log(e);
      let options = { confirm: true,even:e}
      console.log(e.currentTarget.dataset.type)
      if (e.currentTarget.dataset.type == 0){
        options.confirm = false
        this.triggerEvent("cancelBtn", options)
      } 
      // console.log(e)
    },
    onGotUserInfo(e) {
         wx.setStorageSync('wechartName',e.detail.userInfo.nickName);
         wx.setStorageSync('wechartImg', e.detail.userInfo.avatarUrl);
          let options = { confirm: true, even: e }
            options.confirm = false
            this.triggerEvent("cancelBtn", options)
    }
  }
})
